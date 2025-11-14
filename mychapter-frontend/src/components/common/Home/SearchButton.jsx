import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const SearchButtonComponent = () => {
  return (
    <Link to="/search">
      <div className="w-10/12 px-5 mt-10 flex bg-white mx-auto rounded-2xl py-2 cursor-pointer">
        <p className="w-full italic text-textprimary/50">Search</p>
        <Search opacity={0.5} />
      </div>
    </Link>
  );
};

export default SearchButtonComponent;
