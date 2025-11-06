import { RectangleEllipsis } from "lucide-react";
import InputComponents from "../atoms/InputComponents";

const ConfirmPasswordField = ({ attributConfirmPassword, handleChangeInputForm }) => {
  return (
    <div className="h-9 w-full flex items-center gap-4 bg-white rounded-xl pl-2.5">
      <RectangleEllipsis strokeOpacity={0.5} size={24} />
      <InputComponents attribut={attributConfirmPassword} classname="w-full placeholder:italic focus:outline-none ring-0" action={handleChangeInputForm} />
    </div>
  );
};

export default ConfirmPasswordField;
