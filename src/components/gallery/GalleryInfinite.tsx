"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { loadMoreHanuries } from "@/app/actions/hanuri";

import { GalleryCard, type GalleryCardItem } from "./GalleryCard";

interface Props {
  year: string;
  /** 서버에서 이미 그린 첫 페이지 */
  initialItems: GalleryCardItem[];
  initialHasMore: boolean;
}

/**
 * 첫 페이지는 SSR.
 * 스크롤이 끝에 닿으면 Server Action 으로 다음 페이지를 붙인다.
 */
export function GalleryInfinite({ year, initialItems, initialHasMore }: Props) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (!hasMore || isPending || items.length === 0) return;

    const cursor = items[items.length - 1]?.id;
    if (!cursor) return;

    startTransition(async () => {
      const result = await loadMoreHanuries(year, cursor);
      setItems((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
    });
  }, [hasMore, isPending, items, year]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (items.length === 0) {
    return (
      <p className="col-span-2 py-8 text-center text-purple-800/80">
        해당 연도의 게시글이 없습니다.
      </p>
    );
  }

  return (
    <>
      {items.map((hanuri, index) => (
        <GalleryCard key={hanuri.id} hanuri={hanuri} index={index} />
      ))}

      <div ref={sentinelRef} className="col-span-2 h-8" />

      {isPending && (
        <p className="col-span-2 text-center text-sm text-purple-600">
          불러오는 중...
        </p>
      )}
    </>
  );
}
