import { useState, useEffect } from "react";
import { requestBE } from "@/lib/requestBE-lib";

const tagNotes = [
  { title: "All", value: "all" },
  { title: "Life", value: "life" },
  { title: "Hobby & Fun", value: "hobby & fun" },
  { title: "Tips & Ideas", value: "tips & ideas" },
  { title: "Work & Study", value: "work & study" },
  { title: "Thoughts & Mood", value: "thoughts & mood" },
];

const useGetDataNotes = (page, limit, filterNotes = [], searchFromQuery) => {
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
      tagNotes.forEach((tag) => {
        if (tag.value !== "all" && filter === tag.value) {
          params += `&tag=${tag.value}`;
        }
      });

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

    if (searchFromQuery) {
      params += `&searchQuery=${searchFromQuery}`;
    }

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
  }, [page, limit, filterNotes, searchFromQuery]);

  return { dataNotes, loading, errorNotes, infoNotes };
};

export default useGetDataNotes;
