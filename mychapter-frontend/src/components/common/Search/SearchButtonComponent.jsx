// components
import { Search } from "lucide-react";

const SearchButtonComponent = () => {
  return (
    <section className="w-10/12 px-5 mt-10 flex justify-between bg-secondary mx-auto rounded-2xl py-2 cursor-pointer">
      <input type="text" placeholder="Search" className="italic w-full outline-0" />
      <Search opacity={0.5} />
    </section>
  );
};

export default SearchButtonComponent;
