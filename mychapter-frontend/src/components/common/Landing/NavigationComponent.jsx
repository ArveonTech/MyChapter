// utils
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// components
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const NavigationComponent = () => {
  const [navigationHamburger, setNavigationHamburger] = useState(false);

  return (
    <div className={`bg-sidebar w-full h-16 px-10 py-5 flex justify-between items-center sticky top-0 duration-300 z-50`}>
      <div>
        <Link to="/">
          <h1 className="text-[clamp(14px,2vw,24px)] sm:text-2xl font-medium">MyChapter</h1>
        </Link>
      </div>
      <div className="hidden md:block">
        <div className="flex gap-5">
          {navLinks.map((link, index) => (
            <a href={link.href} className="text-foreground underline-offset-4 hover:underline" key={index}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-5">
          <Button asChild className="hidden sm:block">
            <Link to="/auth/signup">Sign up</Link>
          </Button>
          <Button asChild variant="secondary" className="hidden xs:block">
            <Link to="/auth/signin">Login</Link>
          </Button>
        </div>
        <div
          className="cursor-pointer hover:bg-accent p-2 rounded-md hidden xss:block md:hidden"
          onClick={() => {
            setNavigationHamburger(!navigationHamburger);
          }}
        >
          <div>
            <Menu />
          </div>
        </div>
      </div>
      <div className={`w-30 absolute top-20 right-5 sm:right-10 md:hidden ${navigationHamburger ? "block" : "hidden"}`}>
        <div className="bg-card flex flex-col rounded-lg justify-center items-center gap-2 py-2">
          {navLinks.map((link, index) => (
            <a href={link.href} className="text-foreground underline-offset-4 hover:underline" key={index}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationComponent;
