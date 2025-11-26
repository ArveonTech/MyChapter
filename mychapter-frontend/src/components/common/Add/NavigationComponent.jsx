// utils
import { data, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// components
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestBE } from "@/lib/requestBE-lib";
import { statusAction } from "@/features/statusActionFormSlice";
import { useEffect, useState } from "react";

const NavigationComponent = ({ mode, dataNotes }) => {
  const accessToken = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const [formEdit, setFormEdit] = useState({});
  const dispatch = useDispatch();
  const backPage = useSelector((state) => state.backPage) || "home";

  const titleQuill = useSelector((state) => state.titleQuillNote);
  const titlePlain = useSelector((state) => state.titlePlainTextNote);
  const contentQuill = useSelector((state) => state.contentQuillNote);
  const contentPlain = useSelector((state) => state.contentPlainTextNote);
  const attributeNote = useSelector((state) => state.attributeNote);

  const { tag, status, incArchive } = attributeNote;

  const formatAdd = {
    titleQuill,
    titlePlain,
    contentQuill,
    contentPlain,
    tag,
    status,
    incArchive,
  };

  useEffect(() => {
    if (mode === "edit" && dataNotes) {
      setFormEdit({
        _id: dataNotes?._id,
        userId: dataNotes?.userId,
        titleQuill,
        titlePlain,
        contentQuill,
        contentPlain,
        tag,
        status,
        incArchive,
        createdAt: dataNotes?.createdAt,
        updatedAt: dataNotes?.updatedAt,
      });
    }
  }, [mode, dataNotes, titleQuill, titlePlain, contentQuill, contentPlain, attributeNote]);

  const handleClick = async () => {
    if (mode === "edit") {
      try {
        const response = await requestBE("PATCH", "api/note/notes/update", formEdit, ``, {
          headers: {
            Bearer: accessToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch(statusAction({ status: response.status, message: response.data.message }));
      } catch (err) {
        dispatch(statusAction({ status: err.status, message: "there is an error" }));
      }
    } else if (mode === "add") {
      try {
        const response = await requestBE("POST", "api/note/notes/add", formatAdd, ``, {
          headers: {
            Bearer: accessToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch(statusAction({ status: response.status, message: response.data.message }));
      } catch (err) {
        dispatch(statusAction({ status: err.status, message: "there is an error" }));
      }
    }
  };

  const hasChanges = () => {
    return !(
      titlePlain === dataNotes?.titlePlain &&
      titleQuill === dataNotes?.titleQuill &&
      contentPlain === dataNotes?.contentPlain &&
      contentQuill === dataNotes?.contentQuill &&
      tag === dataNotes?.tag &&
      status === dataNotes?.status &&
      incArchive === dataNotes?.incArchive
    );
  };

  return (
    <nav className="px-5 xss:px-10 ">
      <div className="flex justify-between">
        <Link to={`/${backPage}`}>
          <div className="bg-primary text-primary-foreground p-2 rounded-3xl">
            <ArrowLeft />
          </div>
        </Link>

        <Button
          disabled={
            !titlePlain.trim() ||
            (mode === "edit" &&
              !hasChanges(
                {
                  titlePlain,
                  titleQuill,
                  tag,
                  status,
                  incArchive,
                },
                dataNotes
              ))
          }
          onClick={handleClick}
        >
          {mode === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </nav>
  );
};

export default NavigationComponent;
