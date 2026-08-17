"use client";

import { useActionState } from "react";

import { login } from "@/app/actions/auth";
import { Button } from "@/components/common/button/Button";
import type { LoginState } from "@/lib/auth/definitions";

/** useActionState 초기값 (아직 제출 전) */
const initialState: LoginState = undefined;

export function LoginForm() {
  // state: 서버에서 돌아온 에러/결과
  // action: form action 에 넘길 함수
  // pending: 제출 중 여부
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label
          htmlFor="username"
          className="mb-1.5 block text-sm font-medium text-purple-900"
        >
          아이디
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />
        {state?.ok === false && state.errors?.username && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.username[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-purple-900"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-xl border border-purple-200 px-4 py-2.5 text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />
        {state?.ok === false && state.errors?.password && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {state?.ok === false && state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <Button type="submit" variant="accent" size="lg" className="w-full">
        {pending ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
