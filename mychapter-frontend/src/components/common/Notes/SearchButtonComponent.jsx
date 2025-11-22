// utils
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import useParamsController from "@/hooks/UseParamsController";
import { useDispatch } from "react-redux";

// components
import { Search } from "lucide-react";
import { loading } from "@/features/loadingSlice";

const SearchButtonComponent = () => {
  const dispatch = useDispatch();
  const { getParam, setParam, getAllParam, setManyParam } = useParamsController();
  const searchFromQuery = getParam("search") || "";
  const [searchInput, setSearchInput] = useState(searchFromQuery);
  const debounceValue = useDebounce(searchInput, 2000);

  const handleSearch = (e) => {
    dispatch(loading(true));
    setSearchInput(e.target.value);
    const current = getAllParam();
    setManyParam({
      ...current,
      page: 1,
      limit: 10,
    });
  };

  useEffect(() => {
    const current = getAllParam();
    setManyParam({
      ...current,
      search: debounceValue,
    });
  }, [debounceValue]);

  return (
    <section className="w-10/12 px-5 mt-10 flex justify-between bg-secondary mx-auto rounded-2xl py-2 cursor-pointer">
      <input type="text" placeholder="Search" value={searchInput} className="w-full outline-0 placeholder:italic" onInput={handleSearch} />
      <Search opacity={0.5} />
    </section>
  );
};

export default SearchButtonComponent;
