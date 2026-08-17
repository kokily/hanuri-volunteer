import Link from "next/link";

import { formatHanuriDate } from "@/lib/hanuri/format";

interface Props {
  id: string;
  title: string;
  tags: string[];
  date: string | null;
  createdAt: Date;
  /** 서버에서 넘긴 관리자 여부 */
  canEdit: boolean;
}

export function HanuriHeader({
  id,
  title,
  tags,
  date,
  createdAt,
  canEdit,
}: Props) {
  const label = formatHanuriDate(date, createdAt);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-2 sm:px-4">
      <div className="relative">
        <div className="flex justify-center">
          {label && (
            <span className="inline-block -rotate-1 rounded-full bg-purple-200 px-4 py-2 font-medium text-purple-700 shadow-md">
              {label}
            </span>
          )}
        </div>
        <h1 className="h3 md:h2 mx-auto mt-4 max-w-3xl text-center text-purple-900">
          {title}
        </h1>
        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-3 text-xl leading-relaxed text-purple-800 sm:mt-5">
          {tags.map((tag) => (
            <span key={tag} className="font-bold text-blue-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {canEdit && (
        <div className="pt-4 text-center">
          <Link
            href={`/write/update/${id}`}
            className="inline-block rounded-lg border border-blue-400 px-2 py-1 font-bold text-blue-400 transition hover:border-teal-200 hover:bg-teal-400 hover:text-teal-100"
          >
            수정
          </Link>
        </div>
      )}
    </div>
  );
}
