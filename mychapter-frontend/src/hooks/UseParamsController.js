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

  const getAllParam = () => {
    return searchParams;
  };

  const setManyParam = (obj) => {
    const newParams = new URLSearchParams(searchParams);

    for (const key in obj) {
      const value = obj[key];

      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    }

    setSearchParams(newParams);
  };

  return { getParam, setParam, getAllParam, setManyParam };
};

export default useParamsController;
