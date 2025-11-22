// utils
import { useEffect } from "react";

// component
import HeaderComponent from "../common/Home/HeaderComponent";
import ArchiveComponent from "../common/Notes/ArchiveComponent";
import FilteringComponent from "../common/Notes/FilteringComponent";
import NotesCardComponent from "../common/Notes/NotesCardComponent";
import SearchButtonComponent from "../common/Notes/SearchButtonComponent";
import OrderComponent from "../common/Notes/SortComponent";

const NotesPage = () => {
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
        <OrderComponent />
      </div>
      <NotesCardComponent />
    </div>
  );
};

export default NotesPage;
