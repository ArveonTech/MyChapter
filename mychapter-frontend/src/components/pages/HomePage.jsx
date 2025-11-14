// components
import getProfile from "@/utils/getProfile";
import IncomingUserNotification from "../common/Home/incomingUserNotification";

import { ToastContainer, toast } from "react-toastify";
import { Sun } from "lucide-react";

const profileImages = {
  "avatar-1": "/images/profile/1.png",
  "avatar-2": "/images/profile/2.png",
  "avatar-3": "/images/profile/3.png",
  "avatar-4": "/images/profile/4.png",
  "avatar-5": "/images/profile/5.png",
  "avatar-6": "/images/profile/6.png",
};

const HomePage = () => {
  const user = getProfile();

  return (
    <div>
      <IncomingUserNotification />
      <header className="mt-5 px-2 xss:px-3 sm:px-10 flex items-center justify-between">
        <div className="flex items-center bg-white w-max p-2 rounded-full gap-2">
          <img src={profileImages[user?.avatar]} alt="avatar-image" className="w-5 xm:w-10 sm:w-12" />
          <p className="hidden xss:block xss:text-[clamp(8px,5vw,14px)] mr-1 xm:text-lg xm:mr-3">Hello, {user?.username}</p>
        </div>
        <div className="w-15 xs:w-20 xm:w-24 xm:h-10 flex items-center bg-white p-1 rounded-full">
          <Sun className="bg-bgHighlight rounded-full p-1 xm:w-8 xm:h-8" />
        </div>
      </header>
      <div></div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
