import "server-only";

import { headers } from "next/headers";

import { db } from "@/lib/db";

import { REFRESH_TTL_SEC } from "./constants";
import {
  clearAuthCookies,
  getAccessCookie,
  getRefreshCookie,
  setAuthCookies,
} from "./cookies";
import {
  createRefreshToken,
  hashToken,
  signAccessToken,
  verifyAccessToken,
} from "./tokens";

/** 서버/UI 에서 쓰는 “현재 로그인 사용자” 요약 */
export type SessionUser = {
  id: string;
  username: string;
  /** 지금 이 브라우저에 묶인 AuthSession.id */
  sessionId: string;
};

/** User-Agent / IP 를 세션에 남겨 기기 구분·감사에 사용 */
async function requestMeta() {
  const h = await headers();
  return {
    userAgent: h.get("user-agent") ?? undefined,
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
  };
}

/**
 * 로그인 성공 후 호출.
 * DB에 새 AuthSession 행을 만들고 쿠키를 심는다.
 * 기존 다른 기기 세션은 지우지 않는다 → 멀티 디바이스.
 */
export async function createAuthSession(userId: string) {
  const refreshToken = createRefreshToken();
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);
  const meta = await requestMeta();

  const session = await db.authSession.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      userAgent: meta.userAgent,
      ip: meta.ip,
    },
  });

  const accessToken = await signAccessToken({
    sub: userId,
    sid: session.id,
  });

  await setAuthCookies(accessToken, refreshToken);

  return session.id;
}

/**
 * Access 가 없거나 만료됐을 때 Refresh 로 재발급.
 * - 성공 시: 새 Refresh 해시로 교체(회전) + 새 Access 발급
 * - 이미 폐기된 Refresh 재사용이면: 도난 의심 → 해당 유저 세션 전부 폐기
 */
async function rotateRefreshSession(
  refreshToken: string,
): Promise<SessionUser | null> {
  const tokenHash = hashToken(refreshToken);

  const existing = await db.authSession.findUnique({
    where: { tokenHash },
    include: { user: { select: { id: true, username: true } } },
  });

  // DB에 없으면 위조·이미 회전된 옛 토큰일 수 있음
  if (!existing) {
    return null;
  }

  // 폐기됐거나 만료된 Refresh
  if (existing.revokedAt || existing.expiresAt < new Date()) {
    // 폐기된 토큰을 다시 쓰면 탈취 후 재사용 가능성 → 전체 로그아웃
    if (existing.revokedAt) {
      await db.authSession.updateMany({
        where: { userId: existing.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }
    await clearAuthCookies();
    return null;
  }

  // 토큰 회전: 옛 Refresh 무효화, 새 해시로 교체
  const nextRefresh = createRefreshToken();
  const nextHash = hashToken(nextRefresh);
  const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);

  const updated = await db.authSession.update({
    where: { id: existing.id },
    data: {
      tokenHash: nextHash,
      expiresAt,
      updatedAt: new Date(),
    },
  });

  const accessToken = await signAccessToken({
    sub: existing.user.id,
    sid: updated.id,
  });

  await setAuthCookies(accessToken, nextRefresh);

  return {
    id: existing.user.id,
    username: existing.user.username,
    sessionId: updated.id,
  };
}

/**
 * 현재 요청의 로그인 사용자.
 * 1) Access 유효하면 DB 세션 확인 후 반환
 * 2) 아니면 Refresh 로 회전 시도
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const access = await getAccessCookie();
  if (access) {
    const payload = await verifyAccessToken(access);
    if (payload) {
      const session = await db.authSession.findFirst({
        where: {
          id: payload.sid,
          userId: payload.sub,
          revokedAt: null,
          expiresAt: { gt: new Date() },
        },
        include: { user: { select: { id: true, username: true } } },
      });

      if (session) {
        return {
          id: session.user.id,
          username: session.user.username,
          sessionId: session.id,
        };
      }
    }
  }

  const refresh = await getRefreshCookie();
  if (!refresh) {
    return null;
  }

  return rotateRefreshSession(refresh);
}

/**
 * 현재 기기만 로그아웃.
 * 다른 브라우저/PC 세션은 유지된다.
 */
export async function revokeCurrentSession() {
  const access = await getAccessCookie();
  const refresh = await getRefreshCookie();

  let sessionId: string | null = null;

  if (access) {
    const payload = await verifyAccessToken(access);
    sessionId = payload?.sid ?? null;
  }

  // Access 가 이미 만료됐어도 Refresh 해시로 세션을 찾을 수 있다
  if (!sessionId && refresh) {
    const found = await db.authSession.findUnique({
      where: { tokenHash: hashToken(refresh) },
      select: { id: true },
    });
    sessionId = found?.id ?? null;
  }

  if (sessionId) {
    await db.authSession.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  await clearAuthCookies();
}
