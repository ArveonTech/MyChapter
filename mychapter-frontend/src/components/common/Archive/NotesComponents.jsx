// utils
import { Activity } from "react";
import useGetArchiveNotes from "@/hooks/Endpoint/useGetArchiveNotes";

// components
import ErrorComponent from "@/components/Status/ErrorComponent";
import LoadingComponent from "@/components/Status/LoadingComponent";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Heart, Pin } from "lucide-react";
import formatDate from "@/utils/formateDate";
import { Link } from "react-router-dom";

const NotesCardComponent = () => {
  const { dataNotes, loading, errorNotes } = useGetArchiveNotes();

  const handleHeader = (note) => {
    if (note.status === "pinned") return <Pin />;
    if (note.status === "favorite") return <Heart />;
    const date = formatDate(note.updatedAt);
    return date;
  };

  return (
    <section className="w-9/12 sm:w-10/12 mx-auto mt-10">
      {errorNotes ? (
        errorNotes.status === 404 ? (
          <p className="text-center text-xl mt-10 text-destructive">Note not found</p>
        ) : (
          <Activity mode="visible">
            <ErrorComponent />
          </Activity>
        )
      ) : loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="grid justify-items-center justify-center gap-10 sm:gap-4 md:gap-7 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Activity mode={dataNotes ? "visible" : "hidden"}>
              {dataNotes?.map((note) => {
                const slug = note.title.split(" ").join("-");

                return (
                  <Link to={`/detail/${slug}-${note._id}`} key={note._id}>
                    <Card className="bg-secondary p-4 my-auto rounded-3xl shadow-md w-full lg:max-w-60 min-h-52">
                      <CardHeader className="p-0 line-clamp-1">
                        <div className="flex items-center justify-between">
                          <h1 className="text-xl font-semibold line-clamp-1 w-1/2">{note.title}</h1>
                          <p className="text-sm font-medium text-textprimary/70 line-clamp-1">{handleHeader(note)}</p>
                        </div>
                        <div className="w-full h-0.5 bg-foreground mt-3"></div>
                      </CardHeader>

                      <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4">Catatan pertama berisi ringkasan singkat tentang progres harian dan checklist kecil yang harus diselesaikan.</CardContent>
                    </Card>
                  </Link>
                );
              })}
            </Activity>
          </div>
        </>
      )}
    </section>
  );
};

export default NotesCardComponent;
