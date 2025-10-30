import { Eye, EyeClosed, RectangleEllipsis } from "lucide-react";
import InputComponents from "../atoms/InputComponents";

const PasswordField = ({ attributPassword, handleChangeInputSigninForm, showPassword, setShowPassword }) => {
  return (
    <div className="h-9 w-full flex justify-between items-center gap-4 bg-white rounded-xl pl-2.5">
      <RectangleEllipsis strokeOpacity={0.5} />
      <InputComponents attribut={attributPassword} classname="w-full placeholder:italic focus:outline-none ring-0" action={handleChangeInputSigninForm} />
      <div className="pr-2.5">{showPassword ? <EyeClosed onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" /> : <Eye onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />}</div>
    </div>
  );
};

export default PasswordField;
