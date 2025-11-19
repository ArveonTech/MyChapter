import { useSearchParams } from "react-router-dom";

const useParamsController = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === null || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  const getParam = (key) => {
    return searchParams.get(key);
  };

  return { getParam, setParam };
};

export default useParamsController;
