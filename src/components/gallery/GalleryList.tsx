import clsx from "clsx";

import { HANURI_PAGE_SIZE } from "@/lib/hanuri/queries";

import { GalleryInfinite } from "./GalleryInfinite";
import type { GalleryCardItem } from "./GalleryCard";

interface Props {
  year: string;
  initialItems: GalleryCardItem[];
}

export function GalleryList({ year, initialItems }: Props) {
  const initialHasMore = initialItems.length === HANURI_PAGE_SIZE;

  return (
    <section
      className={clsx(
        "relative w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8",
        "from-purple-25 bg-gradient-to-b to-white",
      )}
    >
      <div className="mx-auto max-w-2xl lg:max-w-screen-xl">
        <h1 className="h3 text-center text-purple-900">{year}년 봉사활동</h1>

        <div className="mt-12 sm:mt-16 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8">
          <GalleryInfinite
            year={year}
            initialItems={initialItems}
            initialHasMore={initialHasMore}
          />
        </div>
      </div>
    </section>
  );
}
