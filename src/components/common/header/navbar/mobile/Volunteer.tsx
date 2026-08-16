import Link from "next/link";

interface Props {
  year: string;
  close: () => void;
}

export function Volunteer({ year, close }: Props) {
  return (
    <Link
      href={`/gallery/${year}`}
      onClick={close}
      className="rounded-lg bg-white/10 px-2 py-2 text-center text-sm font-medium text-purple-50 transition hover:bg-white/20 hover:text-white"
    >
      {year}
    </Link>
  );
}
