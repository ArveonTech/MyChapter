// utils
import formatDate from "@/utils/formateDate";
import { Activity, useEffect, useMemo } from "react";
import useGetDataNotes from "@/hooks/Endpoint/useGetDataNotes";
import useParamsController from "@/hooks/UseParamsController";

// components
import ErrorComponent from "@/components/Status/ErrorComponent";
import LoadingComponent from "@/components/Status/LoadingComponent";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotesCardComponent = () => {
  const { getParam, setParam, getAllParam, setManyParam } = useParamsController();
  const loadingSearch = useSelector((state) => state.loadingSearch);
  const valueLayoutRow = useSelector((state) => state.setLayoutRow);

  const pageFromQuery = parseInt(getParam("page")) || 1;
  const limitPageFromQuery = parseInt(getParam("limit")) || 10;

  const searchFromQuery = getParam("search") || "";
  const tagFromQuery = getParam("tag") || "";
  const statusFromQuery = getParam("status") || "";
  const sortByFromQuery = getParam("sortBy") || "";
  const orderByFromQuery = getParam("orderBy") || "";

  const filterNotes = useMemo(() => [tagFromQuery, statusFromQuery, sortByFromQuery, orderByFromQuery], [tagFromQuery, statusFromQuery, sortByFromQuery, orderByFromQuery]);
  const { dataNotes, loading, errorNotes, infoNotes } = useGetDataNotes({ page: pageFromQuery, limit: limitPageFromQuery, filterNotes: filterNotes, searchFromQuery: searchFromQuery });

  const totalPage = Math.ceil(parseInt(infoNotes?.total) / 10);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageFromQuery, searchFromQuery, tagFromQuery, statusFromQuery, sortByFromQuery, orderByFromQuery]);

  const handlePrevPage = () => {
    if (!pageFromQuery || pageFromQuery <= 1) return;

    const current = getAllParam();
    setManyParam({
      ...current,
      page: pageFromQuery - 1,
      limit: 10,
    });
  };

  const handleNextPage = (pageNext) => {
    if (!pageFromQuery || pageFromQuery >= totalPage) return;

    const current = getAllParam();
    setManyParam({
      ...current,
      page: pageFromQuery + pageNext,
      limit: 10,
    });
  };

  return (
    <>
      <section className="w-9/12 sm:w-10/12 mx-auto mt-10">
        {errorNotes ? (
          errorNotes.status === 404 ? (
            <p className="text-center text-xl mt-10 text-destructive">Note not found</p>
          ) : (
            <Activity mode="visible">
              <ErrorComponent />
            </Activity>
          )
        ) : loading || loadingSearch ? (
          <LoadingComponent />
        ) : (
          <>
            <div className={`grid justify-items-center justify-center gap-10 sm:gap-4 md:gap-7 lg:gap-10  ${valueLayoutRow ? "lg:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}>
              <Activity mode={dataNotes ? "visible" : "hidden"}>
                {dataNotes?.map((note) => {
                  const slug = note.title.split(" ").join("-");

                  return (
                    <Link to={`/detail/${slug}-${note._id}`} key={note._id}>
                      <Card className={`bg-secondary p-4 my-auto rounded-3xl shadow-md w-full min-h-52 flex justify-between ${valueLayoutRow ? "lg:max-w-[600px]" : "lg:max-w-60"}`}>
                        <div>
                          <CardHeader className="p-0 line-clamp-1">
                            <div className="flex items-center justify-between">
                              <h1 className="text-xl font-semibold line-clamp-1">{note?.title}</h1>
                              <p className="text-sm font-medium text-textprimary/70 line-clamp-1">{formatDate(note?.updatedAt)}</p>
                            </div>
                            <div className="w-full h-0.5 bg-foreground mt-3"></div>
                          </CardHeader>

                          <CardContent className="p-0 text-textprimary/80 leading-relaxed line-clamp-4 mt-2">{note?.content}</CardContent>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </Activity>
            </div>
          </>
        )}
      </section>
      {errorNotes ? (
        ""
      ) : (
        <Pagination className={`mt-14`}>
          <PaginationContent>
            {pageFromQuery <= 1 ? (
              ""
            ) : (
              <PaginationItem>
                <PaginationPrevious className={`cursor-pointer`} onClick={handlePrevPage} />
              </PaginationItem>
            )}
            {pageFromQuery - 1 !== 0 && pageFromQuery - 1 <= totalPage ? (
              <PaginationItem>
                <PaginationLink onClick={handlePrevPage} className={`cursor-pointer`}>
                  {pageFromQuery - 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              ""
            )}
            <PaginationItem>
              <PaginationLink isActive={true}>{pageFromQuery}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {pageFromQuery + 2 <= totalPage ? (
              <PaginationItem>
                <PaginationLink onClick={() => handleNextPage(2)} className={`cursor-pointer`}>
                  {pageFromQuery + 2}
                </PaginationLink>
              </PaginationItem>
            ) : (
              ""
            )}
            <PaginationItem>{pageFromQuery >= totalPage ? "" : <PaginationNext className={`cursor-pointer`} onClick={() => handleNextPage(1)} />}</PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default NotesCardComponent;
