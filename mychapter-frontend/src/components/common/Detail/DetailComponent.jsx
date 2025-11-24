// components
import ErrorComponent from "@/components/Status/ErrorComponent";
import LoadingComponent from "@/components/Status/LoadingComponent";

const DetailComponent = ({ dataNotes, loading, errorNotes }) => {
  return (
    <>
      {errorNotes ? (
        <ErrorComponent />
      ) : loading ? (
        <LoadingComponent />
      ) : (
        <div className="px-10 mt-10">
          <header>
            <h1 className="text-2xl border-b-2">{dataNotes?.title}</h1>
          </header>
          <main className="mt-10">
            <p className="text-[clamp(8px,10vw,14px)] sm:text-lg">{dataNotes?.content}</p>
          </main>
        </div>
      )}
    </>
  );
};

export default DetailComponent;
