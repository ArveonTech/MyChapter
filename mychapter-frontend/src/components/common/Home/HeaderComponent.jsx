// utils
import getProfile from "@/utils/getProfile";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/features/ThemeProvider";
import DOMPurify from "dompurify";

// component
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Notes", href: "/notes" },
  { label: "Add", href: "/add" },
  { label: "User", href: "/user" },
];

const profileImages = {
  "avatar-1": "/images/profile/1.png",
  "avatar-2": "/images/profile/2.png",
  "avatar-3": "/images/profile/3.png",
  "avatar-4": "/images/profile/4.png",
  "avatar-5": "/images/profile/5.png",
  "avatar-6": "/images/profile/6.png",
};

const HeaderComponent = () => {
  const location = useLocation();
  const user = getProfile();
  const [navigationHamburger, setNavigationHamburger] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="mt-5 px-2 xss:px-3 sm:px-10 flex items-center justify-between relative">
      <div className="flex items-center bg-accent w-max p-2 rounded-full gap-2">
        <Avatar className="md:w-12 md:h-12">
          <AvatarImage src={profileImages[user?.avatar]} alt="avatar-images" />
          <AvatarFallback>{profileImages["avatar-1"]}</AvatarFallback>
        </Avatar>
        <p className="hidden xss:block xss:text-[clamp(8px,5vw,14px)] mr-1 xm:text-lg xm:mr-3 line-clamp-1">Hello, {DOMPurify.sanitize(user?.username)}</p>
      </div>
      <div className="hidden md:block">
        {navLinks.map((link, index) => (
          <Button
            asChild
            variant="link"
            key={index}
            className={`
        relative no-underline! text-md lg:text-xl
        after:content-[''] after:absolute  after:bottom-0
        after:h-0.5 after:bg-foreground after:transition-all after:duration-300 after:left-1/2 after:-translate-x-1/2
        ${location.pathname === link.href ? "after:w-[50%] " : "after:w-[0%] hover:after:w-[50%] "}
      `}
          >
            <a href={link.href}>{link.label}</a>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-1 xs:gap-3">
        <div className="hidden xs:block">
          <div className="xss:w-15 xs:w-20 xm:w-24 xm:h-10 flex items-center bg-secondary p-1 rounded-full cursor-pointer transition-all duration-500" onClick={toggleTheme}>
            <div
              className={`bg-primary text-primary-foreground rounded-full p-1 xm:w-8 xm:h-8 transform transition-transform duration-500 ease-in-out ${
                theme === "dark" ? "translate-x-10 xm:translate-x-14" : "translate-x-10 xm:translate-x-0"
              }`}
            >
              {theme === "dark" ? <Moon /> : <Sun />}
            </div>
          </div>
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
      <div className={`w-30 absolute top-20 right-5 sm:right-10 md:hidden z-40 ${navigationHamburger ? "block" : "hidden"}`}>
        <div className="bg-card flex flex-col rounded-lg">
          {navLinks.map((link, index) => (
            <Button asChild variant="link" className="text-md" key={index}>
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
