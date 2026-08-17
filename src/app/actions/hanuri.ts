"use server";

import { HANURI_PAGE_SIZE, listHanuriesByYear } from "@/lib/hanuri/queries";

/**
 * 무한 스크롤용.
 * 클라이언트에서 year + 마지막 id 를 넘겨 다음 페이지를 받는다.
 */
export async function loadMoreHanuries(year: string, cursor: string) {
  const items = await listHanuriesByYear(year, cursor);
  return {
    items,
    /** 다음 페이지가 더 있는지 (이번이 PAGE_SIZE 만큼이면 true) */
    hasMore: items.length === HANURI_PAGE_SIZE,
  };
}
