import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/session";

import { MobileNav } from "./mobile/MobileNav";
import { WebNav } from "./web/WebNav";

const NavList = [
  { label: "홈으로", href: "/" },
  { label: "소개글", href: "/about" },
  { label: "봉사활동" },
];

/** async: 매 요청마다 쿠키/세션을 확인 */
export async function Navbar() {
  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  return (
    <div className="px-4 sm:px-6">
      <nav className="mx-auto flex max-w-screen-xl items-center pt-5">
        <div className="flex w-full items-center justify-between">
          <WebNav list={NavList} isLoggedIn={isLoggedIn} />

          <div className="block w-48 shrink-0 grow-0 sm:w-52 lg:hidden">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="하누리 봉사회"
                width={208}
                height={70}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          <MobileNav list={NavList} isLoggedIn={isLoggedIn} />
        </div>
      </nav>
    </div>
  );
}
