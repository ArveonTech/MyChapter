// utils
import { useEffect, useState } from "react";

// components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, RectangleEllipsis, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import UseGetProfile from "@/hooks/Endpoint/UseGetProfile";
import { useDispatch, useSelector } from "react-redux";
import { statusUpdateProfile } from "@/features/updateProfileStatusSlice";
import { requestBE } from "@/lib/requestBE-lib";
import { setrender } from "@/features/setRenderProfileSlice";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

const AccountComponent = () => {
  const accessToken = localStorage.getItem("access-token");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const valueRender = useSelector((state) => state.setRenderProfile);
  const { dataProfile, errorDataProfile } = UseGetProfile({ valueRender });

  const [usernameNew, setUsernameNew] = useState("");
  const [passwordNew, setNewPassword] = useState("");
  const [errorFormatPassword, setErrorFormatPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [errorSavePassword, setErrorSavePassword] = useState(false);

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

  const handleSave = async (from) => {
    if (from === "username") {
      try {
        const response = await requestBE("POST", "api/user/me/changeprofile", formatUpdateUsername, ``, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const accessTokenNew = response.data?.accessToken;
        localStorage.setItem("access-token", accessTokenNew);

        setErrorSavePassword("");
        setErrorFormatPassword("");
        setOpenPassword(false);

        dispatch(setrender(!valueRender));
        dispatch(statusUpdateProfile({ status: response.status, message: response.data.result.message }));
      } catch (err) {
        if (err) setErrorSavePassword(false);
        setErrorFormatPassword(err.data.error);
        dispatch(statusUpdateProfile({ status: err.status, message: "there is an error" }));
      }
    } else if ("signout") {
      try {
        const response = await requestBE("GET", "auth/signout", null, ``, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        localStorage.removeItem("access-token");
        navigate("/");
      } catch (err) {
        if (err) setErrorSavePassword(false);
        setErrorFormatPassword(err.data.error);
        dispatch(statusUpdateProfile({ status: err.status, message: "there is an error" }));
      }
    }
  };

  if (errorDataProfile) {
    dispatch(statusUpdateProfile({ status: 400, message: "there is an error" }));
  }

  if (errorSavePassword) {
    setOpenPassword(false);
  }

  return (
    <div className="flex flex-col items-center justify-center w-8/12 mt-20 mx-auto">
      <div className="w-full">
        <h1 className="text-2xl border-b-2">Account</h1>
        <div className="mt-3 bg-secondary p-2 rounded flex justify-between cursor-pointer">
          <h1>Change Username</h1>
          <Dialog>
            <DialogTrigger>
              <User />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={`text-lg sm:text-2xl text-center`}>Change New Username</DialogTitle>
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
          <Dialog openPassword={openPassword} onOpenPasswordChange={setOpenPassword}>
            <DialogTrigger>
              <RectangleEllipsis onClick={() => setOpenPassword(true)} />
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
                <div className={"bg-primary mt-5 text-primary-foreground rounded text-center py-1 text-lg"} onClick={() => handleSave("password")}>
                  Save
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-3 bg-destructive p-2 rounded flex justify-between cursor-pointer">
          <h1 className="text-destructive-foreground">Sign out</h1>
          <Dialog>
            <DialogTrigger>
              <LogOut color="#fff" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={`text-lg sm:text-2xl text-center text-destructive-foreground`}>Sign out</DialogTitle>
                <DialogDescription className={`text-md text-foreground`}>Are you sure ?</DialogDescription>
                <div className={"bg-primary mt-5 text-primary-foreground rounded text-center py-1 text-lg"} onClick={() => handleSave("signout")}>
                  Yes
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountComponent;
