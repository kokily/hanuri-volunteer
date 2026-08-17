import type { Metadata } from "next";

import { About } from "@/components/about/About";
import { Gradient } from "@/components/common/gradient/Gradient";

export const metadata: Metadata = {
  title: "소개글 | 하누리 봉사회",
  description:
    "하누리 봉사회 임원을 소개합니다. 이웃과 함께하는 봉사 정신을 전합니다.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Gradient />
    </>
  );
}
