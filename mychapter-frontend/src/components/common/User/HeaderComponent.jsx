// utils
import DOMPurify from "dompurify";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { requestBE } from "@/lib/requestBE-lib";
import { useDispatch, useSelector } from "react-redux";
import UseGetProfile from "@/hooks/Endpoint/UseGetProfile";
import { useState, useEffect } from "react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// components
import { Pencil } from "lucide-react";
import { statusUpdateProfile } from "@/features/updateProfileStatusSlice";
import { setrender } from "@/features/setRenderProfileSlice";

const profileImages = {
  "avatar-1": "/images/profile/1.png",
  "avatar-2": "/images/profile/2.png",
  "avatar-3": "/images/profile/3.png",
  "avatar-4": "/images/profile/4.png",
  "avatar-5": "/images/profile/5.png",
  "avatar-6": "/images/profile/6.png",
};
const profileSelectImages = [
  { avatar: "avatar-1", source: "/images/profile/1.png" },
  { avatar: "avatar-2", source: "/images/profile/2.png" },
  { avatar: "avatar-3", source: "/images/profile/3.png" },
  { avatar: "avatar-4", source: "/images/profile/4.png" },
  { avatar: "avatar-5", source: "/images/profile/5.png" },
  { avatar: "avatar-6", source: "/images/profile/6.png" },
];

const HeaderComponent = () => {
  const accessToken = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  const valueRender = useSelector((state) => state.setRenderProfile);
  const { dataProfile, errorDataProfile } = UseGetProfile({ valueRender });
  const [avatarNow, setAvatarNow] = useState(dataProfile?.avatar);
  const [size, setSize] = useState(20);

  const formatUpdate = {
    _id: dataProfile?._id,
    role: dataProfile?.role,
    username: dataProfile?.username,
    email: dataProfile?.email,
    avatar: avatarNow,
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSize(32);
      } else {
        setSize(24);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (errorDataProfile) {
    dispatch(statusUpdateProfile({ status: 400, message: "there is an error" }));
  }

  const handleSave = async () => {
    try {
      const response = await requestBE("POST", "api/user/me/changeprofile", formatUpdate, ``, {
        headers: {
          Bearer: accessToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const accessTokenNew = response.data?.accessToken;
      localStorage.setItem("access-token", accessTokenNew);
      dispatch(setrender(!valueRender));
      dispatch(statusUpdateProfile({ status: response.status, message: response.data.message }));
    } catch (err) {
      dispatch(statusUpdateProfile({ status: err.status, message: "there is an error" }));
    }
  };

  return (
    <div>
      <div className="flex items-center mx-auto bg-accent w-8/12 min-h-12 rounded py-5 px-3 md:p-5 gap-5 mt-10">
        <Avatar className="h-fit md:w-fit md:h-fit relative">
          <AvatarImage src={profileImages[dataProfile?.avatar]} alt="avatar-images" className="w-16 h-16 md:w-28 md:h-28 object-cover" />
          <AvatarFallback>{profileImages["avatar-1"]}</AvatarFallback>
          <Dialog>
            <div className="absolute -bottom-2 right-0">
              <DialogTrigger>
                <Pencil color="#000" size={size} />
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={`text-lg sm:text-2xl text-center`}>Choose your avatar</DialogTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-items-center gap-5">
                  {profileSelectImages.map((profile) => (
                    <div className={`w-24 p-5 cursor-pointer ${avatarNow === profile.avatar && "bg-secondary rounded-full"}`} onClick={() => setAvatarNow(profile.avatar)} key={profile.avatar}>
                      <img src={profile.source} alt={profile.avatar} />
                    </div>
                  ))}
                </div>
                <DialogDescription></DialogDescription>
                <DialogClose>
                  <div className={"bg-primary text-primary-foreground rounded text-center py-1 text-lg"} onClick={handleSave}>
                    Save
                  </div>
                </DialogClose>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Avatar>
        <div>
          <h1 className="text-[clamp(8px,5vw,24px)] sm:text-md font-bold">{DOMPurify.sanitize(dataProfile?.username)}</h1>
          <p className="text-[clamp(8px,5vw,14px)]  xm:text-lg xm:mr-3 line-clamp-1">{DOMPurify.sanitize(dataProfile?.email)}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
