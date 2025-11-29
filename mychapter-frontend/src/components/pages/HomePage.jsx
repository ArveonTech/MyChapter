// utils
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { status } from "@/features/deleteStatusSlice";

// components
import HeaderComponent from "@/components/common/Home/HeaderComponent.jsx";
import IncomingUserNotificationComponent from "@/components/common/Home/IncomingUserNotificationComponent.jsx";
import HeroComponent from "@/components/common/Home/HeroComponent.jsx";
import FilterNoteComponent from "@/components/common/Home/FilterNoteComponent.jsx";
import NotesCardComponent from "@/components/common/Home/NotesCardComponent.jsx";

const HomePage = () => {
  const theme = localStorage.getItem("app-theme");
  const statusDelete = useSelector((state) => state.deleteStatus);
  const dispatch = useDispatch();

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
    if (!statusDelete) return;

    if (statusDelete.status === 200) {
      notify("success", statusDelete.message);
    } else {
      notify("error", statusDelete.message);
    }

    dispatch(status(""));
  }, [statusDelete]);

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="mb-10">
      <IncomingUserNotificationComponent />
      <HeaderComponent />
      <HeroComponent />
      <FilterNoteComponent />
      <NotesCardComponent />
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

export default HomePage;
