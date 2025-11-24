// utils
import { useRef, useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // theme default
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { titleQuill } from "@/features/titleQuillNoteSlice";
import { attributeNote } from "@/features/attributeNoteAddSlice";
import { contentQuill } from "@/features/ContentQuillNoteSlice";

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

const RichEditorComponent = () => {
  const dispatch = useDispatch();
  const [navActive, setNavActive] = useState(false);

  const editorRefTitle = useRef();
  const editorRefContent = useRef();
  const [activeEditor, setActiveEditor] = useState(null);

  // plain text
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    if (document.querySelector(".ql-toolbar")) return;

    if (editorRefTitle.current) {
      const qTitle = new Quill(editorRefTitle.current, {
        theme: "snow",
        placeholder: "Type your title...",
        modules: {
          toolbar: false,
        },
      });

      qTitle.on("text-change", () => {
        setTitle(qTitle.root.innerHTML);

        const text = qTitle.getText();

        if (text.length > 100) {
          qTitle.deleteText(100, text.length);
        }
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

      dispatch(titleQuill(qTitle.getContents().ops));
    }

    if (editorRefContent.current) {
      const qContent = new Quill(editorRefContent.current, {
        theme: "snow",
        placeholder: "Type your content...",
        modules: {
          toolbar: false,
        },
      });

      qContent.on("text-change", () => {
        setContent(qContent.root.innerHTML);

        const text = qContent.getText();

        if (text.length > 100) {
          qContent.deleteText(100, text.length);
        }
      });

      qContent.on("selection-change", (range) => {
        if (range !== null) {
          setActiveEditor({ quill: qContent, range, value: "content" });

          const format = qContent.getFormat(range);

          setIsBoldContent(!!format.bold);
          setIsItalicContent(!!format.italic);
          setIsColorContent(format.color);
          setFontContent(format.font || "default");

          return;
        }
      });

      dispatch(contentQuill(qContent.getContents().ops));
    }
  }, []);

  const typeValue = (value) => {
    let type = "";

    tagNotes.map((tag) => {
      if (tag.value === value) return (type = "tag");
    });

    statusNotes.map((notes) => {
      if (notes.value === value) return (type = "status");
    });

    return type;
  };

  const handleSelect = (value) => {
    const filterType = typeValue(value);

    setFilter((prev) => ({
      ...prev,
      [filterType]: value,
    }));

    dispatch(attributeNote(filter));
  };

  return (
    <div className="mt-20 px-10">
      <div ref={editorRefTitle} id="title" style={{ border: "none" }}></div>
      <div ref={editorRefContent} id="content" style={{ border: "none" }}></div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-11/12 md:w-10/12 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 pb-10 shadow-lg rounded-xl z-50">
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
          <Select
            onValueChange={(value) => {
              setFilter((prev) => ({ ...prev, incArchive: value === "archive" }));

              dispatch(attributeNote(filter));
            }}
          >
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
    </div>
  );
};

export default RichEditorComponent;
