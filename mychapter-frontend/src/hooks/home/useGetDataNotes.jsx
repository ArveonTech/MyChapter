import { useState, useEffect } from "react";
import { requestBE } from "@/lib/requestBE-lib";
import { useSelector } from "react-redux";

const useGetDataNotes = () => {
  const filter = useSelector((state) => state.filterHome);
  const accessToken = localStorage.getItem("access-token");
  const [loading, setLoading] = useState(false);
  const [dataNotes, setDataNotes] = useState([]);
  const [errorNotes, setErrorNotes] = useState(null);

  useEffect(() => {
    setDataNotes(null);
    setErrorNotes(null);
    setLoading(true);

    let params = "";

    if (filter === "pinned") {
      params += "&pinned=true";
    }

    if (filter === "favorite") {
      params += "&favorite=true";
    }

    if (filter === "latest") {
      params += "&latest=true";
    }

    if (filter === "archive") {
      params += "&archive=true";
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await requestBE("GET", "api/note/records", null, `page=1&limit=10${params}`, {
          headers: {
            Bearer: accessToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setDataNotes(response?.data?.data);
      } catch (err) {
        setErrorNotes(err);
        console.info(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return { dataNotes, loading, errorNotes };
};

export default useGetDataNotes;
