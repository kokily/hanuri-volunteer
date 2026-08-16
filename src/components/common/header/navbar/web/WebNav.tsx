"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { NotVolunteer } from "./NotVolunteer";
import { Volunteer } from "./Volunteer";

interface Props {
  list: { label: string; href?: string }[];
}

export function WebNav({ list }: Props) {
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
    </div>
  );
}
