import { useState, useEffect } from "react";
import { requestBE } from "@/lib/requestBE-lib";

const useGetArchiveNotes = () => {
  const accessToken = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [dataNotes, setDataNotes] = useState([]);
  const [errorNotes, setErrorNotes] = useState(null);

  useEffect(() => {
    setDataNotes(null);
    setErrorNotes(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await requestBE("GET", "api/note/incArchive", null, ``, {
          headers: {
            Bearer: accessToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setDataNotes(response?.data?.data.item);
      } catch (err) {
        setErrorNotes(err);
        console.info(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataNotes, loading, errorNotes };
};

export default useGetArchiveNotes;
