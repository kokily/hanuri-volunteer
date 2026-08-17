"use client";

import { type KeyboardEvent, useState } from "react";

interface Props {
  tags: string[];
  onChange: (tags: string[]) => void;
}

/**
 * WriteForm 이 이미 <form> 이므로 여기에 또 <form> 을 두면 안 된다.
 * Enter / 추가 버튼으로만 태그를 넣는다.
 */
export function EditorTags({ tags, onChange }: Props) {
  const [input, setInput] = useState("");

  function addTag() {
    const next = input.trim();
    if (!next || tags.includes(next)) return;
    onChange([...tags, next]);
    setInput("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    // 바깥 글 저장 form 제출 방지
    e.preventDefault();
    addTag();
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-purple-700">태그</p>
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="입력 후 Enter"
          className="min-w-[12rem] flex-1 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm text-purple-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />
        <button
          type="button"
          onClick={addTag}
          className="cursor-pointer rounded-full bg-purple-200 px-4 py-2 text-sm font-semibold text-purple-800 transition hover:bg-purple-600 hover:text-white"
        >
          추가
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="bg-purple-25 cursor-pointer rounded-full px-3 py-1 text-sm font-medium text-purple-700 transition hover:bg-rose-100 hover:text-rose-700"
              title="클릭하여 삭제"
            >
              #{tag} ×
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
