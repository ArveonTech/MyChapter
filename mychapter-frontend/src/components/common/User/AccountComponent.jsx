// utils
import { useEffect, useState } from "react";

// components
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RectangleEllipsis, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import UseGetProfile from "@/hooks/Endpoint/UseGetProfile";
import { useDispatch, useSelector } from "react-redux";
import { statusUpdateProfile } from "@/features/updateProfileStatusSlice";
import { requestBE } from "@/lib/requestBE-lib";
import { setrender } from "@/features/setRenderProfileSlice";

const AccountComponent = () => {
  const accessToken = localStorage.getItem("access-token");
  const valueRender = useSelector((state) => state.setRenderProfile);
  const [size, setSize] = useState(20);
  const dispatch = useDispatch();
  const [usernameNew, setUsernameNew] = useState("");
  const { dataProfile, errorDataProfile } = UseGetProfile({ valueRender });
  const [passwordNew, setNewPassword] = useState("");
  const [errorFormatPassword, setErrorFormatPassword] = useState("");

  const formatUpdateUsername = {
    _id: dataProfile?._id,
    role: dataProfile?.role,
    username: usernameNew,
    email: dataProfile?.email,
    avatar: dataProfile?.avatar,
  };

  const formatUpdatePassword = {
    idUser: dataProfile?._id,
    newPassword: passwordNew,
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

  const handleSave = async (from) => {
    if (from === "username") {
      try {
        const response = await requestBE("POST", "api/user/me/changeprofile", formatUpdateUsername, ``, {
          headers: {
            Bearer: accessToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const accessTokenNew = response.data?.accessToken;
        localStorage.setItem("access-token", accessTokenNew);
        dispatch(setrender(!valueRender));
        dispatch(statusUpdateProfile({ status: response.status, message: response.data.result.message }));
      } catch (err) {
        dispatch(statusUpdateProfile({ status: err.status, message: "there is an error" }));
      }
    } else if (from === "password") {
      try {
        const response = await requestBE("POST", "auth/change-password", formatUpdatePassword, ``, {
          headers: {
            Bearer: accessToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const accessTokenNew = response.data?.accessToken;
        localStorage.setItem("access-token", accessTokenNew);
        dispatch(setrender(!valueRender));
        dispatch(statusUpdateProfile({ status: response.status, message: response.data.result.message }));
      } catch (err) {
        setErrorFormatPassword(err.data.error);
      }
    }
  };

  if (errorDataProfile) {
    dispatch(statusUpdateProfile({ status: 400, message: "there is an error" }));
  }

  return (
    <div className="flex flex-col items-center justify-center w-8/12 mt-20 mx-auto">
      <div className="w-full">
        <h1 className="text-2xl border-b-2">Account</h1>
        <div className="mt-3 bg-secondary p-2 rounded flex justify-between cursor-pointer">
          <h1 color="#000" size={size}>
            Change Username
          </h1>
          <Dialog>
            <DialogTrigger>
              <User />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={`text-lg sm:text-2xl text-center`}>Change New Username</DialogTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-items-center gap-5"></div>
                <DialogDescription>
                  <Input
                    className={`mt-5 text-foreground`}
                    id="username"
                    type="text"
                    placeholder="Enter new username"
                    name="username"
                    required
                    autoComplete="username"
                    value={usernameNew}
                    onChange={(event) => setUsernameNew(event.target.value)}
                  />
                </DialogDescription>
                <DialogClose>
                  <div className={"bg-primary mt-5 text-primary-foreground rounded text-center py-1 text-lg"} onClick={() => handleSave("username")}>
                    Save
                  </div>
                </DialogClose>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-3 bg-secondary p-2 rounded flex justify-between cursor-pointer">
          <h1>Change Password</h1>
          <Dialog>
            <DialogTrigger>
              <RectangleEllipsis />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={`text-lg sm:text-2xl text-center mb-5`}>Change New Password</DialogTitle>
                <DialogDescription className={`text-destructive italic ${errorFormatPassword ? "block" : "hidden"}`}>*{errorFormatPassword}</DialogDescription>
                <DialogDescription>
                  <Input
                    className={` text-foreground`}
                    id="password"
                    type="text"
                    placeholder="Enter new password"
                    name="password"
                    required
                    autoComplete="new-password"
                    value={passwordNew}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </DialogDescription>
                <DialogClose>
                  <div className={"bg-primary mt-5 text-primary-foreground rounded text-center py-1 text-lg"} onClick={() => handleSave("password")}>
                    Save
                  </div>
                </DialogClose>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountComponent;
