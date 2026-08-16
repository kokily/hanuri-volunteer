"use client";

import { Fragment } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { MenuIcon } from "./MenuIcon";
import clsx from "clsx";
import { NotVolunteer } from "./NotVolunteer";
import { Volunteer } from "./Volunteer";

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021"];

interface Props {
  list: { label: string; href?: string }[];
}

export function MobileNav({ list }: Props) {
  return (
    <div className="block lg:hidden">
      <Popover>
        {({ open, close }) => (
          <>
            <PopoverButton
              className={clsx(
                "group relative z-50 h-5 w-6 rotate-0 transform cursor-pointer",
                "transition duration-500 ease-in-out focus:outline-none",
              )}
              aria-label="Toggle Navigation"
            >
              <MenuIcon open={open} />
            </PopoverButton>

            <PopoverPanel
              transition
              className={clsx(
                "absolute inset-x-0 top-0 z-40 w-screen overflow-y-scroll px-4 py-16 sm:px-8",
                "bg-gradient-to-tr from-purple-600 to-purple-600",
                "transition duration-300 ease-out data-closed:-translate-y-full data-closed:opacity-0",
              )}
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="mx-auto flex w-full flex-col items-center justify-evenly space-y-6">
                  {list.map((menu) => (
                    <Fragment key={`mobile-link-${menu.label}`}>
                      {menu.label !== "봉사활동" && (
                        <NotVolunteer menu={menu} close={close} />
                      )}
                    </Fragment>
                  ))}
                </div>

                <hr className="my-8 w-full border-purple-200/30 sm:my-10" />

                <div className="mx-auto w-full max-w-md">
                  <p
                    className={clsx(
                      "text-center text-lg font-semibold tracking-wider uppercase",
                      "text-purple-200 sm:text-left",
                    )}
                  >
                    봉사활동
                  </p>
                  <div
                    className={clsx(
                      "mt-4 grid justify-items-center gap-4",
                      "sm:grid-cols-2 sm:justify-items-start sm:gap-x-8",
                    )}
                  >
                    {YEARS.map((year) => (
                      <Volunteer key={year} year={year} close={close} />
                    ))}
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
}
