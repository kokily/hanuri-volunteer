"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import { AdminTab } from "./AdminTab";
import { NotVolunteer } from "./NotVolunteer";
import { Volunteer } from "./Volunteer";

interface Props {
  list: { label: string; href?: string }[];
  /** 서버에서 넘긴 로그인 여부 */
  isLoggedIn: boolean;
}

export function WebNav({ list, isLoggedIn }: Props) {
  const pathname = usePathname();

  return (
    <div className="hidden items-center justify-between md:space-x-6 lg:flex lg:space-x-10">
      {list.map((menu) => (
        <Fragment key={`desktop-link-${menu.label}`}>
          {menu.label !== "봉사활동" ? (
            <NotVolunteer
              pathname={pathname}
              href={menu.href!}
              label={menu.label}
            />
          ) : (
            <Volunteer pathname={pathname} />
          )}
        </Fragment>
      ))}

      {isLoggedIn && <AdminTab pathname={pathname} />}
    </div>
  );
}
