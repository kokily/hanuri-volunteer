import "server-only";

import { db } from "@/lib/db";

/** 한 페이지에 가져올 글 수 */
export const HANURI_PAGE_SIZE = 10;

/**
 * 연도별 목록 (커서 페이지네이션).
 * cursor = 이전 페이지 마지막 글 id. 없으면 첫 페이지.
 */
export async function listHanuriesByYear(year: string, cursor?: string) {
  return db.hanuri.findMany({
    where: { year },
    ...(cursor
      ? {
          cursor: { id: cursor },
          skip: 1,
        }
      : {}),
    take: HANURI_PAGE_SIZE,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      thumbnail: true,
      year: true,
      date: true,
      createdAt: true,
    },
  });
}

/** 상세용 — 없으면 null */
export async function getHanuriById(id: string) {
  return db.hanuri.findUnique({ where: { id } });
}
