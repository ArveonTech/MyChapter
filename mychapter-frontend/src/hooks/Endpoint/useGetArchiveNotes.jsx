import { useState, useEffect } from "react";
import { requestBE } from "@/lib/requestBE-lib";

const useGetArchiveNotes = ({ page, limit }) => {
  const accessToken = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [dataNotes, setDataNotes] = useState([]);
  const [errorNotes, setErrorNotes] = useState(null);

  useEffect(() => {
    setDataNotes([]);
    setErrorNotes(null);
    setLoading(true);

    let params = "";

    if (page && limit) {
      params += `page=${page}`;
      params += `&limit=${limit}`;
    }

    const fetchData = async () => {
      try {
        const response = await requestBE("GET", "api/note/incArchive", null, `${params}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setDataNotes(response?.data?.data.item);
      } catch (err) {
        setErrorNotes(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { dataNotes, loading, errorNotes };
};

export default useGetArchiveNotes;
