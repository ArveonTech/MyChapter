// utils
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// components
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestBE } from "@/lib/requestBE-lib";
import { statusAdd } from "@/features/statusAddSlice";

const NavigationComponent = ({ mode, dataNotes }) => {
  const accessToken = localStorage.getItem("access-token");
  const dispatch = useDispatch();

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

  const handleClick = async () => {
    try {
      const response = await requestBE("POST", "api/note/notes/add", formatAdd, ``, {
        headers: {
          Bearer: accessToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(statusAdd({ status: response.status, message: response.data.message }));
    } catch (err) {
      dispatch(statusAdd({ status: response.status, message: err }));
    }
  };

  return (
    <nav className="px-5 xss:px-10 ">
      <div className="flex justify-between">
        <Link to={`/home`}>
          <div className="bg-primary text-primary-foreground p-2 rounded-3xl">
            <ArrowLeft />
          </div>
        </Link>

        <Button disabled={!titlePlain.trim() || titleQuill === dataNotes?.titleQuill} onClick={handleClick}>
          {mode === "add" ? "Add" : "Edit"}
        </Button>
      </div>
    </nav>
  );
};

export default NavigationComponent;
