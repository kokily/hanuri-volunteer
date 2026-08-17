import { z } from "zod";
import { GALLERY_YEARS } from "@/lib/gallery-years";

export const HanuriWriteSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력하세요."),
  body: z.string().trim().min(1, "본문을 입력하세요."),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().url("썸네일을 등록하세요."),
  year: z.enum(GALLERY_YEARS as unknown as [string, ...string[]]),
  date: z.string().min(1, "봉사활동 날짜를 선택하세요."),
});

export type HanuriWriteInput = z.infer<typeof HanuriWriteSchema>;

export type WriteFormState =
  | { ok: false; message?: string; errors?: Record<string, string[]> }
  | { ok: true; id: string }
  | undefined;
