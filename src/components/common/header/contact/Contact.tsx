import Image from "next/image";
import Link from "next/link";
import { ContactItem } from "./ContactItem";

export function Contact() {
  const ContactList = [
    {
      title: "후원계좌",
      content: "농협 355-0082-3684-43",
      icon: "registered",
      bg: "bg-rose-200",
    },
    {
      title: "주소지",
      content: "천호동 221-1",
      icon: "mapPin",
      bg: "bg-yellow-400",
    },
    {
      title: "이메일",
      content: "xogml18131@hanmail.net",
      icon: "mail",
      bg: "bg-purple-200",
    },
  ];

  return (
    <div className="hidden px-4 sm:px-6 lg:block">
      <div className="relative mx-auto max-w-screen-xl border-b border-purple-200/30 py-5">
        <div className="flex items-center justify-between">
          <div className="w-60 shrink-0 grow-0">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="하누리봉사회"
                width={240}
                height={80}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          <ul className="ml-8 flex lg:space-x-6 xl:space-x-16">
            {ContactList.map((item) => (
              <ContactItem
                key={item.title}
                title={item.title}
                content={item.content}
                icon={item.icon}
                bg={item.bg}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
