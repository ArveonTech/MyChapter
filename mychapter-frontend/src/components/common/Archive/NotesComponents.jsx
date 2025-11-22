// utils
import useGetArchiveNotes from "@/hooks/Endpoint/useGetArchiveNotes";

const NotesCardComponent = () => {
  const { dataNotes, loading, errorNotes } = useGetArchiveNotes();

  const handleHeader = (note) => {
    if (note.status === "pinned") return <Pin />;
    if (note.status === "favorite") return <Heart />;
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
              {dataNotes?.map((note) => (
                <Card className="bg-secondary p-4 my-auto rounded-3xl shadow-md w-full lg:max-w-60 min-h-52" key={note._id}>
                  <CardHeader className="p-0 line-clamp-1">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-semibold line-clamp-1">{note.title}</h1>
                      <p className="text-sm font-medium text-textprimary/70 line-clamp-1">{handleHeader(note)}</p>
                    </div>
                    <div className="w-full h-0.5 bg-foreground mt-3"></div>
                  </CardHeader>

                  <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4">Catatan pertama berisi ringkasan singkat tentang progres harian dan checklist kecil yang harus diselesaikan.</CardContent>
                </Card>
              ))}
            </Activity>
          </div>
          <div className="w-full flex justify-center">
            <Button asChild className="block max-w-fit mt-10">
              <a href={(filterStore && filterStore === "pinned") || filterStore === "favorite" ? `/notes?status=${filterStore}` : `/notes`}>See more...</a>
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default NotesCardComponent;
