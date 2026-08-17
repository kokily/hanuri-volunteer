import Link from "next/link";
import clsx from "clsx";

import { logout } from "@/app/actions/auth";

interface Props {
  /** 현재 경로 — 글 작성 활성 표시용 */
  pathname: string;
}

/**
 * 로그인된 관리자에게만 보이는 메뉴.
 * 로그아웃은 Server Action(form)으로 처리 → 클라이언트 세션 라이브러리 불필요.
 */
export function AdminTab({ pathname }: Props) {
  const isWrite = pathname === "/write" || pathname.startsWith("/write/");

  return (
    <>
      <Link href="/write">
        <div className="group relative p-0.5">
          <span
            className={clsx(
              "relative z-10 text-lg font-medium",
              isWrite
                ? "text-purple-600"
                : "text-purple-700 duration-300 ease-in-out group-hover:text-purple-600",
            )}
          >
            글 작성
          </span>
          <span
            className={clsx(
              "absolute -right-1 bottom-0 -left-1 h-1.5 origin-bottom scale-x-0 rounded-lg bg-yellow-400",
              isWrite
                ? "scale-x-100"
                : "duration-300 ease-in-out group-hover:scale-x-100",
            )}
          />
        </div>
      </Link>

      <form action={logout}>
        <button
          type="submit"
          className="group relative cursor-pointer p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
        >
          <span className="relative z-10 text-lg font-medium text-purple-700 duration-300 ease-in-out group-hover:text-purple-600">
            로그아웃
          </span>
        </button>
      </form>
    </>
  );
}
