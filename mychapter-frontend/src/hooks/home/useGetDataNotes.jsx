import { useState, useEffect } from "react";
import { requestBE } from "@/lib/requestBE-lib";

const useGetDataNotes = (page, limit, filterNotes = []) => {
  const accessToken = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [dataNotes, setDataNotes] = useState([]);
  const [infoNotes, setInfoNotes] = useState({});
  const [errorNotes, setErrorNotes] = useState(null);
  const pageNotes = page;
  const limitNotes = limit;

  useEffect(() => {
    setDataNotes(null);
    setErrorNotes(null);
    setLoading(true);

    let params = "";

    filterNotes.forEach((filter) => {
      if (filter === "pinned") {
        params += "&status=pinned";
      }

      if (filter === "favorite") {
        params += "&status=favorite";
      }

      if (filter === "archive") {
        params += "&incArchive=true";
      }

      if (filter === "latest") {
        params += "&latest=true";
      }
    });

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await requestBE("GET", "api/note/records", null, `page=${pageNotes}&limit=${limitNotes}${params}`, {
          headers: {
            Bearer: accessToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setDataNotes(response?.data?.data.item);
        const { total, page, limit } = response?.data?.data;
        setInfoNotes({ total, page, limit });
      } catch (err) {
        setErrorNotes(err);
        setErrorNotes(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, filterNotes]);

  return { dataNotes, loading, errorNotes, infoNotes };
};

export default useGetDataNotes;
