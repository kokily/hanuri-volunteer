import Image from "next/image";
import Link from "next/link";
import { WebNav } from "./web/WebNav";
import { MobileNav } from "./mobile/MobileNav";

export function Navbar() {
  const NavList = [
    { label: "홈으로", href: "/" },
    { label: "소개글", href: "/about" },
    { label: "봉사활동" },
  ];

  return (
    <div className="px-4 sm:px-6">
      <nav className="mx-auto flex max-w-screen-xl items-center pt-5">
        <div className="flex w-full items-center justify-between">
          <WebNav list={NavList} />

          <div className="block w-48 shrink-0 grow-0 sm:w-52 lg:hidden">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="하누리 봉사회"
                width={208}
                height={70}
                className="h-auto w-full"
                priority
              />
            </Link>
          </div>

          <MobileNav list={NavList} />
        </div>
      </nav>
    </div>
  );
}
