import { HeroMedia } from "./hero/HeroMedia";
import { HeroText } from "./hero/HeroText";

export function Home() {
  return (
    <section className="from-purple-25 bg-gradient-to-b to-purple-50 px-4 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl lg:grid lg:grid-cols-12 lg:gap-8">
        <HeroText />
        <HeroMedia />
      </div>
    </section>
  );
}
