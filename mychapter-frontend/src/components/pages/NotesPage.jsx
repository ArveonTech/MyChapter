// utils
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { status } from "@/features/deleteStatusSlice";

// component
import HeaderComponent from "../common/Home/HeaderComponent";
import ArchiveComponent from "../common/Notes/ArchiveComponent";
import FilteringComponent from "../common/Notes/FilteringComponent";
import NotesCardComponent from "../common/Notes/NotesCardComponent";
import SearchButtonComponent from "../common/Notes/SearchButtonComponent";
import SortComponent from "../common/Notes/SortComponent";

const NotesPage = () => {
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
    document.title = "Notes";
  }, []);

  return (
    <div className="mb-14">
      <HeaderComponent />
      <SearchButtonComponent />
      <ArchiveComponent />
      <div className="flex justify-between items-center mt-10">
        <FilteringComponent />
        <SortComponent />
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

export default NotesPage;
