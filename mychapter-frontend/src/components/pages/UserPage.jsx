// components
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";

// component
import AccountComponent from "../common/User/AccountComponent";
import HeaderComponent from "../common/User/HeaderComponent";
import { useEffect } from "react";
import { statusUpdateProfile } from "@/features/updateProfileStatusSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("app-theme");
  const statusUpdate = useSelector((state) => state.updateProfileStatus);
  const notify = (status, message) =>
    toast[status](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === "dark" ? "dark" : "light",
      transition: Bounce,
    });

  useEffect(() => {
    if (!statusUpdate) return;

    if (statusUpdate.status === 200) {
      notify("success", statusUpdate.message);
    } else {
      notify("error", statusUpdate.message);
    }

    dispatch(statusUpdateProfile(""));
  }, [statusUpdate]);

  return (
    <div>
      <HeaderComponent />
      <AccountComponent />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </div>
  );
};

export default UserPage;
