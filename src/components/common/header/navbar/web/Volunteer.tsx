"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@/components/common/icon/Icon";
import { GALLERY_YEARS } from "@/lib/gallery-years";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  pathname: string;
}

export function Volunteer({ pathname }: Props) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <MenuButton className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">
            <div className="group relative p-0.5">
              <span
                className={clsx(
                  "relative z-10 flex items-center text-lg font-medium duration-300",
                  "ease-in-out group-hover:text-purple-600",
                  open ? "text-purple-600" : "text-purple-700",
                )}
              >
                봉사활동
                <Icon
                  icon="chevronDown"
                  className={clsx(
                    "ml-1.5 h-4.5 w-4.5 transform duration-300 ease-in-out",
                    open && "rotate-180",
                  )}
                  stroke={2}
                />
              </span>
              <span
                className={clsx(
                  "absolute -right-1 bottom-0 -left-1 h-1.5 origin-bottom scale-x-0 transform",
                  "rounded-lg bg-yellow-400 duration-300 ease-in-out group-hover:scale-x-100",
                )}
              />
            </div>
          </MenuButton>

          <MenuItems
            className={clsx(
              "absolute left-1/2 z-20 mt-3 w-72 -translate-x-1/2 p-3",
              "rounded-2xl border border-gray-50 bg-white shadow-lg outline-none",
            )}
          >
            <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-purple-400 uppercase">
              연도 선택
            </p>

            {/* 연도만 2열 그리드 + 높이 제한 스크롤 */}
            <div className="grid max-h-64 grid-cols-2 gap-1 overflow-y-auto">
              {GALLERY_YEARS.map((year) => {
                const href = `/gallery/${year}`;
                const active = pathname === href;

                return (
                  <MenuItem key={year}>
                    <Link
                      href={href}
                      className={clsx(
                        "rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition",
                        active
                          ? "bg-purple-25 text-purple-600"
                          : "hover:bg-purple-25/60 text-purple-800",
                      )}
                    >
                      {year}년
                    </Link>
                  </MenuItem>
                );
              })}
            </div>

            <div className="mt-2 border-t border-purple-100 pt-2">
              <MenuItem>
                <Link
                  href={`/gallery/${GALLERY_YEARS[0]}`}
                  className="hover:bg-purple-25/60 block rounded-xl px-3 py-2 text-center text-sm font-medium text-purple-600"
                >
                  최근 활동 보기
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
