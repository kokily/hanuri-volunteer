"use client";

import { useActionState, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/common/button/Button";
import { GALLERY_YEARS, LATEST_GALLERY_YEAR } from "@/lib/gallery-years";
import type { WriteFormState } from "@/lib/hanuri/definitions";
import "@/styles/quill-hanuri.css";

import { EditorBody } from "./editor/EditorBody";
import { EditorTags } from "./editor/EditorTags";
import { EditorTitle } from "./editor/EditorTitle";

type Initial = {
  title?: string;
  body?: string;
  tags?: string[];
  thumbnail?: string;
  year?: string;
  date?: string;
};

interface Props {
  action: (prev: WriteFormState, formData: FormData) => Promise<WriteFormState>;
  initial?: Initial;
  mode?: "create" | "edit";
}

export function WriteForm({ action, initial, mode = "create" }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? "");
  const [year, setYear] = useState(initial?.year ?? LATEST_GALLERY_YEAR);
  const [date, setDate] = useState(initial?.date ?? "");
  const [uploading, setUploading] = useState(false);

  const [state, formAction, pending] = useActionState(action, undefined);

  async function onPickThumbnail() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("fail");
        const data = (await res.json()) as { url: string };
        setThumbnail(data.url);
      } catch {
        alert("썸네일 업로드 실패");
      } finally {
        setUploading(false);
      }
    };
  }

  const fieldClass =
    "w-full rounded-xl border border-purple-200 bg-white px-3 py-2.5 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200";

  return (
    <form
      action={formAction}
      className="from-purple-25 bg-gradient-to-b to-white pb-28"
    >
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="body" value={body} />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      <input type="hidden" name="thumbnail" value={thumbnail} />
      <input type="hidden" name="year" value={year} />
      <input type="hidden" name="date" value={date} />

      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-purple-500 uppercase">
          {mode === "edit" ? "글 수정" : "새 글 작성"}
        </p>

        <div className="mt-4">
          <EditorTitle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 날짜 + 연도 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-purple-700">
              봉사 날짜
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={fieldClass}
              required
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-purple-700">연도</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={fieldClass}
            >
              {GALLERY_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-8">
          <EditorTags tags={tags} onChange={setTags} />
        </div>

        {/* 썸네일 드롭존 느낌 */}
        <div className="mt-10">
          <p className="mb-2 text-sm font-medium text-purple-700">
            대표 이미지
          </p>
          <button
            type="button"
            onClick={onPickThumbnail}
            disabled={uploading}
            className="group hover:bg-purple-25/50 relative block w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-purple-200 bg-white text-left transition hover:border-purple-400"
          >
            {thumbnail ? (
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={thumbnail}
                  alt="썸네일"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 48rem, 100vw"
                />
                <span className="absolute right-3 bottom-3 rounded-full bg-purple-900/80 px-3 py-1 text-xs font-medium text-white">
                  {uploading ? "업로드 중..." : "클릭하여 변경"}
                </span>
              </div>
            ) : (
              <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 px-4">
                <span className="text-lg font-semibold text-purple-700">
                  {uploading ? "업로드 중..." : "썸네일 이미지를 올려 주세요"}
                </span>
                <span className="text-sm text-purple-500">클릭하여 선택</span>
              </div>
            )}
          </button>
        </div>

        <div className="mt-10">
          <p className="mb-2 text-sm font-medium text-purple-700">본문</p>
          <EditorBody body={body} onChangeBody={setBody} />
        </div>

        {state?.ok === false && (
          <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {state.message}
          </p>
        )}
      </div>

      {/* sticky 저장 바 — 사이트 노랑 CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-purple-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="hidden text-sm text-purple-600 sm:block">
            저장하면 갤러리에 바로 반영됩니다.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="ml-auto min-w-[8rem] disabled:opacity-60"
          >
            {pending ? "저장 중..." : "저장하기"}
          </Button>
        </div>
      </div>
    </form>
  );
}
