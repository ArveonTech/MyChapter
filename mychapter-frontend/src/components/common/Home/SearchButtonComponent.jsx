// utils
import { Link } from "react-router-dom";

// components
import { Search } from "lucide-react";

const SearchButtonComponent = () => {
  return (
    <Link to="/notes">
      <section className="w-full px-5 mt-10 md:mt-0 flex bg-secondary mx-auto rounded-2xl py-2 cursor-pointer md:w-full">
        <p className="w-full italic text-foreground/50">Search</p>
        <Search opacity={0.5} />
      </section>
    </Link>
  );
};

export default SearchButtonComponent;
