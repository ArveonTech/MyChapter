import { User } from "lucide-react";
import InputComponents from "../../atoms/InputComponents";

const UsernameField = ({ attributUsername, handleChangeInputForm }) => {
  return (
    <div className="h-9 w-full flex justify-between items-center gap-4 bg-white rounded-xl pl-2.5">
      <User strokeOpacity={0.5} />
      <InputComponents attribut={attributUsername} classname="w-full placeholder:italic focus:outline-none ring-0" action={handleChangeInputForm} />
    </div>
  );
};

export default UsernameField;
