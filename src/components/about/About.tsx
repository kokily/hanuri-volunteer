import { ABOUT_MEMBERS } from "@/lib/about-members";

import { AboutFeature } from "./section/AboutFeature";
import { AboutHeader } from "./section/AboutHeader";

export function About() {
  return (
    <section className="bg-purple-25 overflow-hidden px-4 pt-10 pb-28 sm:px-6 sm:pb-36 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <AboutHeader />

        {ABOUT_MEMBERS.map((member) => (
          <AboutFeature
            key={member.id}
            layout={member.layout}
            role={member.role}
            name={member.name}
            body={member.body}
            image={member.image}
            imageAlt={member.imageAlt}
            blob={member.blob}
          />
        ))}
      </div>
    </section>
  );
}
