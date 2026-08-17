import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import Script from "next/script";
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
  verification: {
    google: "QoZXLZcWfX7rpZHByrLzV6-rZho8EjuJ97ChM3AtM6c",
    other: {
      "naver-site-verification": "cba244e2a17e3202fdefcc52e4a367ba48a526a0",
    },
  },
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BKE2LHPQG3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BKE2LHPQG3');
          `}
        </Script>
      </body>
    </html>
  );
}
