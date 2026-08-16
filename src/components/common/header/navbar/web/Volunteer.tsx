"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@/components/common/icon/Icon";
import clsx from "clsx";
import Link from "next/link";

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021"];

interface Props {
  pathname: string;
}

export function Volunteer({ pathname }: Props) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <MenuButton className="cursor-pointer outline-none focus:outline-none data-focus:outline-none">
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
              "absolute left-1/2 z-20 mt-3 w-screen max-w-xs -translate-x-1/2 p-4",
              "rounded-2xl border border-gray-50 bg-white shadow-lg",
            )}
          >
            {YEARS.map((year) => (
              <MenuItem key={year}>
                <Link
                  href={`/gallery/${year}`}
                  className={clsx(
                    "block w-full rounded-xl py-4 sm:p-5",
                    pathname === `/gallery/${year}`
                      ? "bg-purple-25"
                      : "hover:bg-purple-25/60 transition duration-200 ease-in-out",
                  )}
                >
                  <h5 className="text-lg font-semibold text-purple-600">
                    {year}년
                  </h5>
                  <p className="mt-1 text-sm text-purple-800 opacity-90">
                    하누리 봉사활동
                  </p>
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
