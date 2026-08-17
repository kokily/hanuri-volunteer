"use server";

import { redirect } from "next/navigation";

import { requireUser } from "@/app/actions/auth";
import {
  HanuriWriteSchema,
  type WriteFormState,
} from "@/lib/hanuri/definitions";
import { db } from "@/lib/db";

function parseForm(formData: FormData) {
  const tagsRaw = formData.get("tags");
  const tags =
    typeof tagsRaw === "string" && tagsRaw.length > 0
      ? (JSON.parse(tagsRaw) as string[])
      : [];

  return HanuriWriteSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    thumbnail: formData.get("thumbnail"),
    year: formData.get("year"),
    date: formData.get("date"),
    tags,
  });
}

/** 새 글 작성 */
export async function createHanuri(
  _prev: WriteFormState,
  formData: FormData,
): Promise<WriteFormState> {
  await requireUser();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: "입력값을 확인하세요.",
    };
  }

  const hanuri = await db.hanuri.create({ data: parsed.data });
  redirect(`/hanuri/${hanuri.id}`);
}

/** 기존 글 수정 */
export async function updateHanuri(
  id: string,
  _prev: WriteFormState,
  formData: FormData,
): Promise<WriteFormState> {
  await requireUser();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: "입력값을 확인하세요.",
    };
  }

  const exists = await db.hanuri.findUnique({ where: { id } });
  if (!exists) {
    return { ok: false, message: "글을 찾을 수 없습니다." };
  }

  const hanuri = await db.hanuri.update({
    where: { id },
    data: parsed.data,
  });
  redirect(`/hanuri/${hanuri.id}`);
}
