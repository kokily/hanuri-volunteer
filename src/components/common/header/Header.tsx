import { Contact } from "./contact/Contact";
import { Navbar } from "./navbar/Navbar";

export function Header() {
  return (
    <header className="bg-purple-25">
      <Contact />
      <Navbar />
    </header>
  );
}
