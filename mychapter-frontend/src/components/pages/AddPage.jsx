// utils
import { useEffect } from "react";
import NavigationComponent from "../common/Add/NavigationComponent";
import RichEditorComponent from "../common/Add/RichEditorComponent";

const AddPage = () => {
  useEffect(() => {
    document.title = "Add";
  }, []);

  return (
    <div className="mt-10">
      <NavigationComponent />
      <RichEditorComponent />
    </div>
  );
};

export default AddPage;
