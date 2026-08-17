import type { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function EditorTitle({ value, onChange }: Props) {
  return (
    <TextareaAutosize
      value={value}
      onChange={onChange}
      placeholder="봉사활동 제목"
      className="w-full resize-none border-0 bg-transparent p-0 text-3xl font-extrabold text-purple-900 outline-none placeholder:text-purple-300 md:text-5xl"
    />
  );
}
