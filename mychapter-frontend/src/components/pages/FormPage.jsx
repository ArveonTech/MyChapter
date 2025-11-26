// utils
import { useEffect, useState } from "react";
import NavigationComponent from "../common/Add/NavigationComponent";
import RichEditorComponent from "../common/Add/RichEditorComponent";
import { useParams } from "react-router-dom";
import useGetNote from "@/hooks/Endpoint/useGetNote";
import LoadingComponent from "../Status/LoadingComponent";
import ErrorComponent from "../Status/ErrorComponent";
import { Bounce, ToastContainer, toast } from "react-toastify";

const FormPage = ({ mode }) => {
  const { id } = useParams();

  const isEdit = mode === "edit" && id;

  const { dataNotes, loading, errorNotes } = isEdit ? useGetNote({ id }) : { dataNotes: null, loading: false, errorNotes: null };

  useEffect(() => {
    document.title = mode === "add" ? "Add" : "Edit";
  }, []);

  if (isEdit && loading) {
    return <LoadingComponent />;
  }

  if (isEdit && errorNotes) {
    return <ErrorComponent />;
  }

  return (
    <div className="mt-10">
      <NavigationComponent mode={mode} dataNotes={dataNotes} />
      <RichEditorComponent mode={mode} dataNotes={dataNotes} />
    </div>
  );
};

export default FormPage;
