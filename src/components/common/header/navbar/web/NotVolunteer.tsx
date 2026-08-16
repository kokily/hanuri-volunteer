import Link from "next/link";
import clsx from "clsx";

interface Props {
  href: string;
  label: string;
  pathname: string;
}

export function NotVolunteer({ href, label, pathname }: Props) {
  return (
    <Link href={href}>
      <div className="group relative p-0.5">
        <span
          className={clsx(
            "relative z-10 text-lg font-medium",
            pathname === href
              ? "text-purple-600"
              : "text-purple-700 duration-300 ease-in-out group-hover:text-purple-600",
          )}
        >
          {label}
        </span>
        <span
          className={clsx(
            "absolute -right-1 bottom-0 -left-1 h-1.5 origin-bottom scale-x-0 transform rounded-lg bg-yellow-400",
            pathname === href
              ? "scale-x-100"
              : "duration-300 ease-in-out group-hover:scale-x-100",
          )}
        />
      </div>
    </Link>
  );
}
