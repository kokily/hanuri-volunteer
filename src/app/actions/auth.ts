"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import { LoginFormSchema, type LoginState } from "@/lib/auth/definitions";
import {
  createAuthSession,
  getCurrentUser,
  revokeCurrentSession,
} from "@/lib/auth/session";
import { db } from "@/lib/db";

/**
 * 로그인 Server Action.
 * useActionState(login, initial) 형태로 폼에 연결한다.
 */
export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { username, password } = parsed.data;

  const user = await db.user.findUnique({ where: { username } });
  // 존재하지 않는 아이디와 틀린 비밀번호를 같은 메시지로 → 계정 열거 방지
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      ok: false,
      message: "아이디 또는 비밀번호가 올바르지 않습니다.",
    };
  }

  // 새 기기 세션 생성 (다른 기기 로그인 유지)
  await createAuthSession(user.id);
  redirect("/write");
}

/** 현재 기기만 로그아웃 후 홈으로 */
export async function logout() {
  await revokeCurrentSession();
  redirect("/");
}

/**
 * 보호 페이지/액션에서 호출.
 * 비로그인이면 /login 으로 보낸다.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
