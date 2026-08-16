import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Header } from "@/components/common/header/Header";
import { Footer } from "@/components/common/footer/Footer";
import "./globals.css";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const title = "하누리 봉사회 - 환영합니다";
const description =
  "모든 봉사를 필요로 하는 곳에 따뜻한 손길을 내밀어 적극적인 봉사활동을 하기 위해 최선을 다하고 있습니다";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://hanuri.or.kr",
    title,
    siteName: "하누리 봉사회",
    images: ["https://hanuri.or.kr/main.png"],
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${roboto.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
