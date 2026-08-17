"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";

import { logout } from "@/app/actions/auth";
import { GALLERY_YEARS } from "@/lib/gallery-years";

import { MenuIcon } from "./MenuIcon";
import { NotVolunteer } from "./NotVolunteer";
import { Volunteer } from "./Volunteer";

interface Props {
  list: { label: string; href?: string }[];
  isLoggedIn: boolean;
}

export function MobileNav({ list, isLoggedIn }: Props) {
  return (
    <div className="block lg:hidden">
      <Popover>
        {({ open, close }) => (
          <>
            <PopoverButton
              className={clsx(
                "group relative z-50 h-5 w-6 cursor-pointer",
                "transition duration-500 ease-in-out outline-none",
                "focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2",
              )}
              aria-label="메뉴 열기"
            >
              <MenuIcon open={open} />
            </PopoverButton>

            <PopoverPanel
              transition
              className={clsx(
                "absolute inset-x-0 top-0 z-40 w-screen overflow-y-auto px-4 py-16 sm:px-8",
                "bg-gradient-to-tr from-purple-600 to-purple-600",
                "transition duration-300 ease-out data-closed:-translate-y-full data-closed:opacity-0",
              )}
            >
              <div className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-center space-y-6">
                  {list.map((menu) => (
                    <Fragment key={`mobile-link-${menu.label}`}>
                      {menu.label !== "봉사활동" && (
                        <NotVolunteer menu={menu} close={close} />
                      )}
                    </Fragment>
                  ))}
                </div>

                <hr className="my-8 w-full border-purple-200/30 sm:my-10" />

                <div className="w-full max-w-md">
                  <p className="text-center text-lg font-semibold tracking-wider text-purple-200 uppercase sm:text-left">
                    봉사활동
                  </p>
                  <div className="mt-4 grid max-h-56 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
                    {GALLERY_YEARS.map((year) => (
                      <Volunteer key={year} year={year} close={close} />
                    ))}
                  </div>
                </div>

                {/* 로그인 시에만 관리 메뉴 */}
                {isLoggedIn && (
                  <>
                    <hr className="my-8 w-full border-purple-200/30 sm:my-10" />
                    <div className="flex flex-col items-center gap-4">
                      <Link
                        href="/write"
                        onClick={close}
                        className="text-xl font-medium text-purple-50 hover:text-white"
                      >
                        글 작성
                      </Link>
                      <form action={logout}>
                        <button
                          type="submit"
                          className="cursor-pointer text-xl font-medium text-purple-50 hover:text-white"
                        >
                          로그아웃
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
}
