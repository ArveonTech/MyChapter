// utils
import { useEffect } from "react";

// components
import HeaderComponent from "../common/Archive/HeaderComponent";
import NotesCardComponent from "../common/Archive/NotesComponents";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ArchivePage = () => {
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
    </div>
  );
};

export default ArchivePage;
