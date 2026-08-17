import "server-only";

import { cookies } from "next/headers";

import {
  ACCESS_COOKIE,
  ACCESS_TTL_SEC,
  REFRESH_COOKIE,
  REFRESH_TTL_SEC,
} from "./constants";

/** 운영(HTTPS)에서만 Secure 쿠키, 로컬 http 에서는 false */
const secure = process.env.NODE_ENV === "production";

/**
 * Access + Refresh 쿠키 함께 심는다
 * 둘 다 httpOnly / 브라우저에서 로드 못 함
 */
export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const jar = await cookies();

  jar.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TTL_SEC,
  });

  jar.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_TTL_SEC,
  });
}

/** 로그아웃 시 인증 쿠키 전부 삭제 */
export async function clearAuthCookies() {
  const jar = await cookies();

  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}

/** Request 쿠키에서 Access Token 문자열 로드 */
export async function getAccessCookie() {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

/** Request 쿠키에서 Refresh Token 문자열 로드 */
export async function getRefreshCookie() {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
}
