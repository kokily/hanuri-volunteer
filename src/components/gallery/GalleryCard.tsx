import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { formatGalleryTitle, formatHanuriDate } from "@/lib/hanuri/format";

const cardColors = [
  "bg-yellow-200",
  "bg-purple-50",
  "bg-rose-50",
  "bg-teal-50",
] as const;

export type GalleryCardItem = {
  id: string;
  title: string;
  thumbnail: string;
  date: string | null;
  createdAt: Date;
};

interface Props {
  hanuri: GalleryCardItem;
  /** 짝수/홀수 레이아웃 + 배경색 */
  index: number;
}

/**
 * 클릭 가능 카드 → Link 사용 (접근성·SEO 개선, onClick 라우팅 제거)
 */
export function GalleryCard({ hanuri, index }: Props) {
  const imageRight = index % 2 === 1;

  return (
    <Link
      href={`/hanuri/${hanuri.id}`}
      className={clsx(
        "grid w-full cursor-pointer rounded-2xl transition duration-500",
        "brightness-100 hover:brightness-75 sm:grid-cols-12",
        index > 0 && "mt-8 lg:mt-0",
        cardColors[index % 4],
      )}
    >
      <div
        className={clsx(
          "relative h-48 rounded-t-2xl sm:col-span-4 sm:h-full",
          imageRight
            ? "sm:order-2 sm:rounded-tl-none sm:rounded-r-2xl"
            : "sm:rounded-l-2xl sm:rounded-tr-none",
        )}
      >
        <Image
          src={hanuri.thumbnail}
          alt={hanuri.title}
          fill
          className={clsx(
            "absolute inset-0 rounded-t-2xl object-cover object-center",
            imageRight
              ? "sm:rounded-tl-none sm:rounded-r-2xl"
              : "sm:rounded-l-2xl sm:rounded-tr-none",
          )}
          sizes="(min-width: 1280px) 13rem, (min-width: 1024px) 16.67rem, (min-width: 640px) 14rem, calc(100vw - 2rem)"
        />
      </div>

      <div
        className={clsx(
          "flex h-full flex-col justify-center px-6 py-8 sm:col-span-8 sm:px-8 sm:py-10 lg:px-6 xl:px-8",
          imageRight && "order-2 sm:order-1",
        )}
      >
        <div>
          <span className="inline-flex -rotate-1 items-center justify-center rounded-xl bg-purple-200 px-3.5 py-0.5 text-sm leading-6 font-medium text-purple-700">
            {formatHanuriDate(hanuri.date, hanuri.createdAt)}
          </span>
        </div>
        <h2 className="mt-4 flex h-14 flex-col justify-center text-2xl font-bold break-keep whitespace-pre-line text-purple-900 sm:text-3xl lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight">
          {formatGalleryTitle(hanuri.title)}
        </h2>
      </div>
    </Link>
  );
}
