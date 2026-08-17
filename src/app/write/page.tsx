import { logout, requireUser } from "@/app/actions/auth";
import { Button } from "@/components/common/button/Button";

/** 인증 확인용 임시 페이지. 나중에 글 작성 UI 로 교체 */
export default async function WritePage() {
  const user = await requireUser();

  return (
    <section className="mx-auto max-w-screen-md px-4 py-16">
      <h1 className="h3 text-purple-900">글 작성 (임시)</h1>
      <p className="mt-2 text-purple-800">
        로그인됨: <strong>{user.username}</strong>
      </p>
      <form action={logout} className="mt-6">
        <Button type="submit" variant="secondary" size="sm">
          로그아웃
        </Button>
      </form>
    </section>
  );
}
