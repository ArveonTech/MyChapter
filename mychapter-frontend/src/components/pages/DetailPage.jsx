// utils
import { useParams } from "react-router-dom";
import useGetNote from "@/hooks/Endpoint/useGetNote";

// components
import DetailComponent from "../common/Detail/DetailComponent";
import NavigationComponent from "../common/Detail/NavigationComponent";
import AttributesComponent from "../common/Detail/AttributesComponent";

const DetailPage = () => {
  const { slug } = useParams();

  const arr = slug.split("-");
  const idNotes = arr[arr.length - 1];

  const { dataNotes, loading, errorNotes } = useGetNote({ id: idNotes });

  return (
    <div className="mt-10">
      <NavigationComponent dataNotes={dataNotes} />
      <DetailComponent dataNotes={dataNotes} loading={loading} errorNotes={errorNotes} />
      <AttributesComponent dataNotes={dataNotes} loading={loading} errorNotes={errorNotes} />
    </div>
  );
};

export default DetailPage;
