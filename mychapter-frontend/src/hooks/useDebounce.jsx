import { loading } from "@/features/loadingSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useDebounce = (value, delay) => {
  const dispatch = useDispatch(loading(false));
  const [debunceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(loading(false));
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debunceValue;
};

export default useDebounce;
