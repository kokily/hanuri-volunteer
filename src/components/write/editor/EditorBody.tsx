"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type Ref,
} from "react";
import type Quill from "quill";
import "react-quill-new/dist/quill.snow.css";

interface Props {
  body: string;
  onChangeBody: (html: string) => void;
}

/** react-quill-new 인스턴스에서 쓰는 getEditor만 타입으로 잡음 */
type QuillEditorHandle = {
  getEditor: () => Quill;
};

type ReactQuillProps = {
  theme?: string;
  value?: string;
  onChange?: (value: string) => void;
  modules?: Record<string, unknown>;
  placeholder?: string;
  ref?: Ref<QuillEditorHandle>;
};

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) throw new Error("upload failed");
  const data = (await res.json()) as { url: string };
  return data.url;
}

export function EditorBody({ body, onChangeBody }: Props) {
  const quillRef = useRef<QuillEditorHandle | null>(null);
  const [ReactQuill, setReactQuill] =
    useState<ComponentType<ReactQuillProps> | null>(null);

  // next/dynamic 은 ref 를 못 넘기므로, 마운트 후 실제 컴포넌트를 로드한다.
  useEffect(() => {
    let mounted = true;
    void import("react-quill-new").then((mod) => {
      if (mounted) {
        setReactQuill(
          () => mod.default as unknown as ComponentType<ReactQuillProps>,
        );
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          [{ header: [2, 3, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.multiple = true;
            input.click();
            input.onchange = async () => {
              const files = input.files;
              if (!files) return;

              const editor = quillRef.current?.getEditor();
              if (!editor) return;

              for (const file of Array.from(files)) {
                try {
                  const url = await uploadImage(file);
                  const range = editor.getSelection(true);
                  const index = range ? range.index : editor.getLength();
                  editor.insertEmbed(index, "image", url);
                  editor.setSelection(index + 1, 0);
                } catch (e) {
                  console.error(e);
                  alert("이미지 업로드 실패");
                }
              }
            };
          },
        },
      },
    }),
    [],
  );

  if (!ReactQuill) {
    return (
      <div className="mb-8 flex min-h-[280px] items-center justify-center rounded-2xl border border-purple-200 bg-white text-sm text-purple-500">
        에디터 불러오는 중...
      </div>
    );
  }

  return (
    <div className="hanuri-quill mb-8">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={body}
        onChange={onChangeBody}
        modules={modules}
        placeholder="활동 내용과 사진을 남겨 주세요."
      />
    </div>
  );
}
