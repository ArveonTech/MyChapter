// utils
import { Link, useNavigate } from "react-router-dom";
import { status } from "@/features/deleteStatusSlice";
import { useDispatch, useSelector } from "react-redux";

// components
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { requestBE } from "@/lib/requestBE-lib";

const NavigationComponent = ({ dataNotes }) => {
  const accessToken = localStorage.getItem("access-token");
  const backPage = useSelector((state) => state.backPage) || "home";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await requestBE("DELETE", `api/note/notes/delete`, dataNotes, ``, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(status({ status: 200, message: "Note successfully deleted" }));
      navigate(`/${backPage}`);
    } catch (err) {
      dispatch(status({ status: 400, message: err.data.message }));
    }
  };

  return (
    <nav className="px-5 xss:px-10 flex justify-between">
      <Link to={`/${backPage}`}>
        <div className="bg-primary text-primary-foreground p-2 rounded-3xl">
          <ArrowLeft />
        </div>
      </Link>
      <div className="flex gap-5">
        <div>
          <Dialog>
            <DialogTrigger>
              <div className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 flex p-1.5 rounded gap-2">
                Delete
                <span>
                  <Trash />
                </span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={`text-center`}>Are you sure?</DialogTitle>
                <DialogDescription>This action cannot be undone. This will permanently delete your note.</DialogDescription>
                <Button variant={"destructive"} onClick={handleDelete}>
                  Yes
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Link to={`/edit/${dataNotes?._id}`}>
          <Button>
            Edit
            <span>
              <Pencil />
            </span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationComponent;
