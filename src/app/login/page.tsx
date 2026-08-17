import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login/LoginForm";
import { getCurrentUser } from "@/lib/auth/session";

/** 이미 로그인이면 작성 페이지로 보냄 */
export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/write");
  }

  return (
    <section className="from-purple-25 bg-gradient-to-b to-purple-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <h1 className="h3 text-center text-purple-900">관리자 로그인</h1>
        <p className="mt-2 text-center text-purple-800/80">
          하누리 봉사회 관리자 전용입니다.
        </p>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
