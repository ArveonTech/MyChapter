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

const useGetDataNotes = ({ page, limit, filterNotes = [], searchFromQuery }) => {
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

      if (filter === "pinned" || filter === "favorite") {
        params += `&status=${filter}`;
      }

      if (filter === "createdAt" || filter === "updatedAt") {
        params += `&orderBy=${filter}`;
      }

      if (filter === "latest" || filter === "oldest") {
        params += `&sortBy=${filter}`;
      }
    });

    if (searchFromQuery) {
      params += `&searchQuery=${searchFromQuery}`;
    }

    const fetchData = async () => {
      try {
        const response = await requestBE("GET", "api/note/records", null, `page=${pageNotes}&limit=${limitNotes}${params}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const { total, page, limit } = response?.data?.data;

        setDataNotes(response?.data?.data.item);
        setInfoNotes({ total, page, limit });
      } catch (err) {
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
