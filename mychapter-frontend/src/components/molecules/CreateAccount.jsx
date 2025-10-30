import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="w-full sm:w-64 h-10 bg-bgInteractive rounded-xl mx-auto mt-10 px-5 flex justify-center items-center hover:bg-bgHighlight cursor-pointer">
      <Link to="/auth/signup" className="font-medium text-[clamp(10px,2.5vw,18px)] ">
        Create New Account
      </Link>
    </div>
  );
};

export default CreateAccount;
