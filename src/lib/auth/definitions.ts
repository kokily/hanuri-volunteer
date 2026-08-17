import { z } from "zod";

/** 로그인 폼 서버 검증 스키마 */
export const LoginFormSchema = z.object({
  username: z.string().trim().min(1, "아이디를 입력하세요."),
  password: z.string().min(1, "비밀번호를 입력하세요."),
});

/**
 * useActionState 가 받는 로그인 결과 타입.
 * - undefined: 최초 렌더
 * - ok:false: 검증/인증 실패
 * - ok:true: 성공 (실제로는 redirect 되므로 거의 안 보임)
 */
export type LoginState =
  | {
      ok: false;
      message?: string;
      errors?: {
        username?: string[];
        password?: string[];
      };
    }
  | {
      ok: true;
    }
  | undefined;
