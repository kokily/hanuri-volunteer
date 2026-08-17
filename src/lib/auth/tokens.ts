import "server-only";

import { createHash, randomBytes } from "crypto";
import { SignJWT, jwtVerify } from "jose";

import { ACCESS_TTL_SEC } from "./constants";

/** AUTH_SECRET 으로 JWT 서명/검증용 키 생성 */
function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET이 설정되지 않았습니다");
  }

  return new TextEncoder().encode(secret);
}

/** Access Token JWT 안에 넣는 최소 클레임 */
export type AccessPayload = {
  /** 로그인 사용자 ID */
  sub: string;
  /** 이 기기 브라우저 AuthSession.id */
  sid: string;
};

/**
 * 짧은 수명(15분) Access Token 발급
 * 매 요청 인증용. Refresh 보다 자주 만료됨
 */
export async function signAccessToken(payload: AccessPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TTL_SEC}s`)
    .sign(getSecretKey());
}

/**
 * Access Token 검증
 * 만료 위조 형식 오류면 null (예외 Throw 안함7)
 */
export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    if (typeof payload.sub !== "string" || typeof payload.sid !== "string") {
      return null;
    }

    return { sub: payload.sub, sid: payload.sid } satisfies AccessPayload;
  } catch {
    return null;
  }
}

/**
 * Refresh Token 원문 생성 (쿠키에만 저장)
 * DB에는 절대 원문을 넣지 않고 해시만 저장
 */
export function createRefreshToken() {
  return randomBytes(48).toString("base64url");
}

/**
 * Refresh Token 해시 (sha256 hex)
 * DB AuthSession.tokenHash 와 비교할 때 사용
 */
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
