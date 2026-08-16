import Link from "next/link";
import clsx from "clsx";

interface Props {
  menu: { label: string; href?: string };
  close: () => void;
}

export function NotVolunteer({ menu, close }: Props) {
  return (
    <Link href={menu.href!} onClick={close}>
      <div className="group relative p-0.5">
        <span
          className={clsx(
            "relative z-10 text-2xl font-medium duration-300",
            "text-purple-50 ease-in-out group-hover:text-white",
          )}
        >
          {menu.label}
        </span>
        <span
          className={clsx(
            "absolute -right-1 bottom-0 -left-1 h-1.5 origin-bottom scale-x-0 transform duration-300 ease-in-out",
            "rounded-lg bg-yellow-400 group-hover:scale-x-100",
          )}
        />
      </div>
    </Link>
  );
}
