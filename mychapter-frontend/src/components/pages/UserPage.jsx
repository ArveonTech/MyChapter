// components
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";

// component
import AccountComponent from "../common/User/AccountComponent";
import HeaderComponent from "../common/User/HeaderComponent";
import { useEffect } from "react";
import { statusUpdateProfile } from "@/features/updateProfileStatusSlice";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="fixed bottom-16 ml-10 bg-secondary p-3 rounded-full hover:bg-accent cursor-pointer">
        <Link to={`/home`}>
          <Home size={28} />
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
