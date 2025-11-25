// utils
import { useEffect } from "react";
import NavigationComponent from "../common/Add/NavigationComponent";
import RichEditorComponent from "../common/Add/RichEditorComponent";
import { useParams } from "react-router-dom";
import useGetNote from "@/hooks/Endpoint/useGetNote";

const FormPage = ({ mode }) => {
  const { id } = useParams();

  useEffect(() => {
    document.title = mode === "add" ? "Add" : "Edit";
  }, []);

  const { dataNotes, loading, errorNotes } = useGetNote({ id });

  return (
    <div className="mt-10">
      <NavigationComponent mode={mode} dataNotes={dataNotes} />
      <RichEditorComponent mode={mode} dataNotes={dataNotes} />
    </div>
  );
};

export default FormPage;
