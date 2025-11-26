// utils
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { status } from "@/features/deleteStatusSlice";

// components
import HeaderComponent from "../common/Archive/HeaderComponent";
import NotesCardComponent from "../common/Archive/NotesComponents";
import { ArrowLeft } from "lucide-react";

const ArchivePage = () => {
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
    document.title = "Archive";
  }, []);

  return (
    <div className="mb-10">
      <HeaderComponent />
      <div className="bg-secondary w-fit mt-10 ml-10 p-2 rounded-3xl">
        <Link to="/notes">
          <ArrowLeft />
        </Link>
      </div>
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

export default ArchivePage;
