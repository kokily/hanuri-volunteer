import { Icon } from "@/components/common/icon/Icon";

interface Props {
  title: string;
  content: string;
  icon: string;
  bg: string;
}

export function ContactItem({ title, content, icon, bg }: Props) {
  return (
    <li className="flex shrink-0">
      <div>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${bg}`}
        >
          <Icon icon={icon} className="h-6 w-6 text-purple-700" />
        </span>
      </div>

      <div className="ml-3 flex-1 xl:ml-4">
        <h5 className="flex items-center text-base font-semibold text-purple-900">
          {title}
        </h5>
        <p className="mt-0.5 text-sm leading-relaxed text-purple-800/90">
          {content}
        </p>
      </div>
    </li>
  );
}
