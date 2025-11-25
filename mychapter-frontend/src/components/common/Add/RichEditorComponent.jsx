// utils
import { useRef, useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // theme default
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { titleQuill } from "@/features/titleQuillNoteSlice";
import { attributeNote } from "@/features/attributeNoteAddSlice";
import { contentQuill } from "@/features/contentQuillNoteSlice";
import { titlePlain } from "@/features/titlePlainTextNoteSlice";
import { contentPlain } from "@/features/contentPlainTextNoteSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";

const fonts = ["serif", "monospace", "sansserif"];
const Font = Quill.import("formats/font");

Font.whitelist = fonts;
Quill.register(Font, true);

const tagNotes = [
  { title: "All", value: "all" },
  { title: "Life", value: "life" },
  { title: "Hobby & Fun", value: "hobby & fun" },
  { title: "Tips & Ideas", value: "tips & ideas" },
  { title: "Work & Study", value: "work & study" },
  { title: "Thoughts & Mood", value: "thoughts & mood" },
];

const statusNotes = [
  { title: "All", value: "all" },
  { title: "Favorite", value: "favorite" },
  { title: "Pinned", value: "pinned" },
];

const RichEditorComponent = ({ mode, dataNotes }) => {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("app-theme");
  const [successAdd, setSuccessAdd] = useState(false);
  const statusAdd = useSelector((state) => state.statusAddNotes);
  const notify = (status, message) =>
    toast[status](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === "dark" ? "dark" : "light",
      transition: Bounce,
    });

  useEffect(() => {
    if (!statusAdd) return;

    if (statusAdd.status === 200) {
      notify("success", statusAdd.message);
      setSuccessAdd(!successAdd);
    } else {
      notify("error", statusAdd.message);
    }

    dispatch(statusAdd(""));
  }, [statusAdd]);

  const editorRefTitle = useRef();
  const editorRefContent = useRef();
  const quillTitleRef = useRef(null);
  const quillContentRef = useRef(null);

  const [activeEditor, setActiveEditor] = useState(null);

  // bold
  const [isBoldTitle, setIsBoldTitle] = useState(false);
  const [isBoldContent, setIsBoldContent] = useState(false);

  // italic
  const [isItalicTitle, setIsItalicTitle] = useState(false);
  const [isItalicContent, setIsItalicContent] = useState(false);

  // color
  const [isColorTitle, setIsColorTitle] = useState(false);
  const [isColorContent, setIsColorContent] = useState(false);

  // color
  const [fontTitle, setFontTitle] = useState(false);
  const [fontContent, setFontContent] = useState(false);

  const [filter, setFilter] = useState({
    tag: "",
    status: "",
    incArchive: false,
  });

  useEffect(() => {
    dispatch(attributeNote(filter));
  }, [filter]);

  useEffect(() => {
    if (document.querySelector(".ql-toolbar")) return;

    if (editorRefTitle.current) {
      const qTitle = new Quill(editorRefTitle.current, {
        theme: "snow",
        placeholder: "Type your title...",
        modules: {
          toolbar: false,
        },
      });

      quillTitleRef.current = qTitle;

      if (mode === "edit" && dataNotes) {
        qTitle.setContents(dataNotes?.titleQuill);
        dispatch(titleQuill(dataNotes?.titleQuill));
        dispatch(titlePlain(qTitle.root.innerText));
      }

      qTitle.on("text-change", () => {
        const text = qTitle.getText();

        if (text.length > 100) {
          qTitle.deleteText(100, text.length);
        }

        dispatch(titleQuill(qTitle.getContents().ops));
        dispatch(titlePlain(qTitle.root.innerText));
      });

      qTitle.on("selection-change", (range) => {
        if (range !== null) {
          setActiveEditor({ quill: qTitle, range, value: "title" });

          const format = qTitle.getFormat(range);
          setIsBoldTitle(!!format.bold);
          setIsItalicTitle(!!format.italic);
          setIsColorTitle(format.color);
          setFontTitle(format.font || "default");

          return;
        }
      });
    }

    if (editorRefContent.current) {
      const qContent = new Quill(editorRefContent.current, {
        theme: "snow",
        placeholder: "Type your content...",
        modules: {
          toolbar: false,
        },
      });

      quillContentRef.current = qContent;

      if (mode === "edit" && dataNotes) {
        qContent.setContents(dataNotes?.contentQuill);
        dispatch(contentQuill(dataNotes?.contentQuill));
        dispatch(contentPlain(qContent.root.innerText));
      }

      qContent.on("text-change", () => {
        dispatch(contentQuill(qContent.getContents().ops));
        dispatch(contentPlain(qContent.root.innerText));
      });

      qContent.on("selection-change", (range) => {
        if (range !== nnull) {
          setActiveEditor({ quill: qContent, range, value: "content" });

          const format = qContent.getFormat(range);

          setIsBoldContent(!!format.bold);
          setIsItalicContent(!!format.italic);
          setIsColorContent(format.color);
          setFontContent(format.font || "default");

          return;
        }
      });
    }
  }, [dataNotes, mode]);

  useEffect(() => {
    if (!successAdd) return;

    if (quillTitleRef.current) {
      quillTitleRef.current.setContents([]);
    }

    if (quillContentRef.current) {
      quillContentRef.current.setContents([]);
    }

    setFilter({
      tag: "",
      status: "",
      incArchive: false,
    });
  }, [successAdd]);

  const typeValue = (value) => {
    let type = "";

    tagNotes.map((tag) => {
      if (tag.value === value) return (type = "tag");
    });

    statusNotes.map((notes) => {
      if (notes.value === value) return (type = "status");
    });

    if (value === "archive") return (type = "incArchive");

    return type;
  };

  const handleSelect = (value) => {
    const filterType = typeValue(value);

    setFilter((prev) => ({
      ...prev,
      [filterType]: value === "archive" ? true : value,
    }));
  };

  return (
    <div className="mt-20 px-10">
      <div ref={editorRefTitle} id="title" style={{ border: "none" }}></div>
      <div ref={editorRefContent} id="content" style={{ border: "none" }}></div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-11/12 md:w-10/12 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 mb-10 rounded-xl z-50">
        {/* Left controls */}
        <div className="flex flex-wrap md:flex-row gap-3 items-center">
          {/* Tag Select */}
          <Select value={filter.tag} onValueChange={handleSelect}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              {tagNotes.map((tag) => (
                <SelectItem value={tag.value} key={tag.value}>
                  {tag.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Select */}
          <Select value={filter.status} onValueChange={handleSelect}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusNotes.map((status) => (
                <SelectItem value={status.value} key={status.value}>
                  {status.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Archive Select */}
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Archive" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="archive">Archive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right controls */}
        <div className="flex flex-wrap md:flex-row gap-3 items-center">
          {/* Bold */}
          <Button
            onClick={() => {
              if (!activeEditor) return;
              const format = activeEditor.quill.getFormat();
              activeEditor.quill.format("bold", !format.bold);
              if (activeEditor.value === "title") setIsBoldTitle(!format.bold);
              else setIsBoldContent(!format.bold);
            }}
            variant={activeEditor?.value === "title" ? (isBoldTitle ? "default" : "outline") : isBoldContent ? "default" : "outline"}
          >
            B
          </Button>

          {/* Italic */}
          <Button
            onClick={() => {
              if (!activeEditor) return;
              const format = activeEditor.quill.getFormat();
              activeEditor.quill.format("italic", !format.italic);
              if (activeEditor.value === "title") setIsItalicTitle(!format.italic);
              else setIsItalicContent(!format.italic);
            }}
            className="italic"
            variant={activeEditor?.value === "title" ? (isItalicTitle ? "default" : "outline") : isItalicContent ? "default" : "outline"}
          >
            I
          </Button>

          {/* Color */}
          <input
            type="color"
            value={isColorTitle || isColorContent || "#000000"}
            onChange={(e) => {
              if (!activeEditor) return;
              activeEditor.quill.format("color", e.target.value);
              if (activeEditor.value === "title") setIsColorTitle(e.target.value);
              else setIsColorContent(e.target.value);
            }}
            className="h-10 w-10 p-0 border-none cursor-pointer"
          />

          {/* Font Select */}
          <Select
            value={fontTitle || fontContent || "default"}
            onValueChange={(value) => {
              if (!activeEditor) return;
              activeEditor.quill.format("font", value);
              if (activeEditor.value === "title") setFontTitle(value);
              else setFontContent(value);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="monospace">Monospace</SelectItem>
              <SelectItem value="sansserif">Sans-serif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </div>
  );
};

export default RichEditorComponent;
