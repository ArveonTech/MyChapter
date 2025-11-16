// component
import { Menu, Sun } from "lucide-react";

// utils
import getProfile from "@/utils/getProfile";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Add", href: "/add" },
  { label: "User", href: "/user" },
];

const HeaderComponent = () => {
  const location = useLocation();
  const user = getProfile();
  const [navigationHamburger, setNavigationHamburger] = useState(false);

  console.info(user);

  const profileImages = {
    "avatar-1": "/images/profile/1.png",
    "avatar-2": "/images/profile/2.png",
    "avatar-3": "/images/profile/3.png",
    "avatar-4": "/images/profile/4.png",
    "avatar-5": "/images/profile/5.png",
    "avatar-6": "/images/profile/6.png",
  };

  return (
    <header className="mt-5 px-2 xss:px-3 sm:px-10 flex items-center justify-between relative">
      <div className="flex items-center bg-bgWhite w-max p-2 rounded-full gap-2">
        <Avatar className="md:w-12 md:h-12">
          <AvatarImage src={profileImages[user?.avatar]} alt="avatar-images" />
          <AvatarFallback>{profileImages["avatar-1"]}</AvatarFallback>
        </Avatar>
        <p className="hidden xss:block xss:text-[clamp(8px,5vw,14px)] mr-1 xm:text-lg xm:mr-3 line-clamp-1">Hello, {user?.username}</p>
      </div>
      <div className="hidden md:block">
        {navLinks.map((link, index) => (
          <Button asChild variant="link" className={`text-md lg:text-xl ${location.pathname === link.href && "underline"}`} key={index}>
            <a href={link.href}>{link.label}</a>
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-1 xs:gap-3">
        <div className="hidden xs:block">
          <div className="xss:w-15 xs:w-20 xm:w-24 xm:h-10 flex items-center bg-bgWhite p-1 rounded-full cursor-pointer">
            <Sun className="bg-bgHighlight rounded-full p-1 xm:w-8 xm:h-8" />
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
        <div className="bg-bgHighlight flex flex-col rounded-lg">
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
