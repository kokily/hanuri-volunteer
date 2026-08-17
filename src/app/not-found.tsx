import Link from "next/link";

export default function NotFound() {
  return (
    <section className="from-purple-25 flex flex-1 flex-col items-center justify-center bg-gradient-to-b to-white px-4 py-24 text-center">
      <h1 className="h3 text-purple-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-purple-800/80">
        요청하신 주소가 없거나 옮겨졌습니다.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-yellow-500 px-6 py-3 font-medium text-purple-900 hover:bg-yellow-600"
      >
        홈으로
      </Link>
    </section>
  );
}
