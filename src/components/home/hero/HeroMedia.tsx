"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Icon } from "@/components/common/icon/Icon";

export function HeroMedia() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-auto mt-16 flex max-w-3xl flex-col justify-center lg:col-span-6 lg:mt-0 lg:max-w-none">
        <div className="relative">
          <Image
            src="/main.png"
            alt="하누리 봉사회 메인사진"
            width={1200}
            height={900}
            priority
            className="h-auto w-full"
            sizes="(min-width: 1280px) 39rem, (min-width: 1024px) 50vw, (min-width: 768px) 48rem, 100vw"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-purple-400 opacity-60" />
            <button
              type="button"
              aria-label="소개 영상 재생"
              className="group relative z-10 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-purple-600/40 duration-300 outline-none hover:bg-purple-600/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
              onClick={() => setOpen(true)}
            >
              <Icon
                icon="playFilled"
                className="h-12 w-12 text-white/90 group-hover:text-white"
              />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition duration-300 data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white transition duration-300 data-closed:translate-y-8 data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/mq6ZgYBh4to?si=pj3XFMHnRBZpf2ok"
                title="하누리 봉사회 소개 영상"
                allowFullScreen
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
