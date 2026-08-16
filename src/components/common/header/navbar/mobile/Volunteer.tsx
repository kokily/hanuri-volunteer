import clsx from "clsx";
import Link from "next/link";

interface Props {
  year: string;
  close: () => void;
}

export function Volunteer({ year, close }: Props) {
  return (
    <Link
      href={`/gallery/${year}`}
      className="sm:justify-self-end"
      onClick={close}
    >
      <div className="group relative p-0.5">
        <span
          className={clsx(
            "relative z-10 text-xl font-medium duration-300",
            "text-purple-50 ease-in-out group-hover:text-white",
          )}
        >
          {year}년
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
