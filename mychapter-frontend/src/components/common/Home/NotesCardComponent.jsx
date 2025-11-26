// utils
import formatDate from "@/utils/formateDate";
import { Activity, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetDataNotes from "@/hooks/Endpoint/useGetDataNotes";
import DOMPurify from "dompurify";

// components
import ErrorComponent from "@/components/Status/ErrorComponent";
import LoadingComponent from "@/components/Status/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Archive, Heart, History, Pin } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { from } from "@/features/backPageSlice";
import useGetArchiveNotes from "@/hooks/Endpoint/useGetArchiveNotes";

const NotesCardComponent = () => {
  const filterStore = useSelector((state) => state.filterStatusHome);
  const filterNotes = useMemo(() => [filterStore], [filterStore]);

  const { dataNotes, loading, errorNotes } = useGetDataNotes({ page: 1, limit: 10, filterNotes: filterNotes });
  const { dataNotes: dataArchive, loading: loadingArchive, errorNotes: errorArchive } = useGetArchiveNotes({ page: 1, limit: 10 });

  const dataToRender = filterStore === "archive" ? dataArchive : dataNotes;
  const loadingToRender = filterStore === "archive" ? loadingArchive : loading;
  const errorToRender = filterStore === "archive" ? errorArchive : errorNotes;

  const handleHeader = (note) => {
    if (filterStore === "") return formatDate(note?.updatedAt);
    if (filterStore === "pinned") return <Pin />;
    if (filterStore === "favorite") return <Heart />;
    if (filterStore === "latest") return <History />;
    if (filterStore === "archive") return <Archive />;
  };

  return (
    <section className="w-9/12 sm:w-10/12 mx-auto mt-10">
      {errorToRender ? (
        errorToRender.status === 404 ? (
          <p className="text-center text-xl mt-10 text-destructive">Note not found</p>
        ) : (
          <Activity mode="visible">
            <ErrorComponent />
          </Activity>
        )
      ) : loadingToRender ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="grid justify-items-center justify-center gap-7 lg:gap-10 sm:grid-cols-2 sd:grid-cols-3 xl:grid-cols-5">
            <Activity mode={dataToRender ? "visible" : "hidden"}>
              {dataToRender?.map((note) => {
                const slug = note?.titlePlain.split(" ").join("-");

                return (
                  <Link to={`/detail/${slug}-${note?._id}`} key={note?._id} onClick={() => dispatch(from("home"))}>
                    <Card className="bg-secondary p-4 rounded-3xl shadow-md w-60 min-h-52 flex flex-col">
                      <CardHeader className="p-0 line-clamp-1">
                        <div className="flex items-center justify-between gap-2">
                          <h1 className="text-xl font-semibold line-clamp-1 flex-1">{DOMPurify.sanitize(note?.titlePlain)}</h1>
                          <p className="text-sm font-medium text-textprimary/70 line-clamp-1">{typeof handleHeader(note) === "object" ? handleHeader(note) : DOMPurify.sanitize(handleHeader(note))}</p>
                        </div>
                        <div className="w-full h-0.5 bg-foreground mt-3"></div>
                      </CardHeader>

                      <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4 min-h-24">{DOMPurify.sanitize(note?.contentPlain) || " "}</CardContent>
                    </Card>
                  </Link>
                );
              })}
            </Activity>
          </div>
          <div className="w-full flex justify-center">
            <Button asChild className="block max-w-fit mt-10">
              <a href={(filterStore && filterStore === "pinned") || filterStore === "favorite" ? `/notes?status=${filterStore}` : filterStore === "archive" ? `/archive` : "/notes"}>See more...</a>
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default NotesCardComponent;
