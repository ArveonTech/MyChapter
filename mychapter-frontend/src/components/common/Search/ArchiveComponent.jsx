// utils
import { Link } from "react-router-dom";

// components
import { ArrowDown } from "lucide-react";


const ArchiveComponent = () => {
  return (
    <Link to="/archive">
      <section className="w-10/12 mx-auto mt-10 flex justify-between bg-sidebar p-2 rounded cursor-pointer">
        <div>
          <h1>Archive</h1>
        </div>
        <div>
          <ArrowDown />
        </div>
      </section>
    </Link>
  );
};

export default ArchiveComponent;
