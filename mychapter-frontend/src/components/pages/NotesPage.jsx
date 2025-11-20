// utils
import { useEffect } from "react";

// component
import HeaderComponent from "../common/Home/HeaderComponent";
import ArchiveComponent from "../common/Search/ArchiveComponent";
import FilteringComponent from "../common/Search/FilteringComponent";
import NotesCardComponent from "../common/Search/NotesCardComponent";
import SearchButtonComponent from "../common/Search/SearchButtonComponent";

const NotesPage = () => {
  useEffect(() => {
    document.title = "Notes";
  }, []);

  return (
    <div className="mb-14">
      <HeaderComponent />
      <SearchButtonComponent />
      <ArchiveComponent />
      <FilteringComponent />
      <NotesCardComponent />
    </div>
  );
};

export default NotesPage;
