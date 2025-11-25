//utils
import Quill from "quill";
import { useEffect, useRef } from "react";

const fonts = ["serif", "monospace", "sansserif"];
const Font = Quill.import("formats/font");

Font.whitelist = fonts;
Quill.register(Font, true);

// components
import ErrorComponent from "@/components/Status/ErrorComponent";
import LoadingComponent from "@/components/Status/LoadingComponent";

const DetailComponent = ({ dataNotes, loading, errorNotes }) => {
  const editorRefTitle = useRef();
  const editorRefContent = useRef();

  useEffect(() => {
    if (document.querySelector(".ql-toolbar")) return;

    if (editorRefTitle.current) {
      const qTitle = new Quill(editorRefTitle.current, {
        readOnly: true,
        modules: {
          toolbar: false,
        },
      });

      qTitle.setContents(dataNotes?.titleQuill);
    }

    if (editorRefContent.current) {
      const qContent = new Quill(editorRefContent.current, {
        readOnly: true,
        modules: {
          toolbar: false,
        },
      });
      qContent.setContents(dataNotes?.contentQuill);
    }
  }, [dataNotes, errorNotes, loading]);

  return (
    <>
      {errorNotes ? (
        <ErrorComponent />
      ) : loading ? (
        <LoadingComponent />
      ) : (
        <div className="px-10 mt-10">
          <header>
            <div ref={editorRefTitle} id="title" style={{ border: "none" }}></div>{" "}
          </header>
          <main className="mt-10">
            <div ref={editorRefContent} id="content" style={{ border: "none" }}></div>{" "}
          </main>
        </div>
      )}
    </>
  );
};

export default DetailComponent;
