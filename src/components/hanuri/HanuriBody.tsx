"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "lightgallery/css/lightgallery.css";

interface Props {
  body: string;
  title: string;
}

/** Quill HTML 에서 img 분리 → 텍스트 + 갤러리 */
export function HanuriBody({ body, title }: Props) {
  const galleryRef = useRef<HTMLDivElement>(null);

  const { images, textHtml } = useMemo(() => {
    if (typeof window === "undefined") {
      return { images: [] as string[], textHtml: body };
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(body, "text/html");
    const images = Array.from(doc.querySelectorAll("img"))
      .map((img) => img.getAttribute("src"))
      .filter((src): src is string => Boolean(src));

    doc.querySelectorAll("img").forEach((img) => img.remove());
    return { images, textHtml: doc.body.innerHTML };
  }, [body]);

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready || images.length === 0 || !galleryRef.current) return;

    let instance: { destroy?: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const lg = (await import("lightgallery")).default;
      if (cancelled || !galleryRef.current) return;
      instance = lg(galleryRef.current, {
        selector: ".gallery-item",
        download: false,
        counter: true,
        speed: 500,
      });
    })();

    return () => {
      cancelled = true;
      instance?.destroy?.();
    };
  }, [images, ready]);

  return (
    <div className="flex justify-center">
      <div className="mx-auto w-full max-w-[1200px] px-2 sm:px-4">
        <div
          className="mt-14 mb-10 text-xl leading-relaxed font-medium text-gray-900 sm:mt-16 sm:text-2xl lg:mt-24"
          dangerouslySetInnerHTML={{ __html: ready ? textHtml : "" }}
        />

        {ready && images.length > 0 && (
          <div ref={galleryRef} className="mt-8">
            <div className="columns-1 gap-4 space-y-4 md:columns-2">
              {images.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="mb-4 break-inside-avoid"
                >
                  <a
                    className="gallery-item block"
                    data-src={src}
                    data-sub-html={`[${title}] ${index + 1}/${images.length}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${title} ${index + 1}`}
                      className="h-auto w-full cursor-pointer rounded-lg shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
