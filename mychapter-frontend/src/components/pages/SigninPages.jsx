import { Eye, EyeClosed, Mail, RectangleEllipsis } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SigninPages = () => {
  const [inputFormSigninValue, setinputFormSigninValue] = useState({
    emai: "",
    password: "",
  });

  const handleChangeInputSigninForm = (input) => {
    const { name, value } = input.target;

    setinputFormSigninValue((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-bgPage md:flex md:justify-center md:items-center md:gap-20 md:px-10 pb-5">
      <div className="w-8/12 sm:w-72 mx-auto md:mx-0 md:w-80 lg:w-96">
        <img src="/images/signin_image.png" alt="image signin" />
        <p className="text-2xl text-center text-textprimary hidden md:block">
          Don’t let your ideas slip away. <span className="font-semibold italic">Capture them here.</span>
        </p>
      </div>
      <div className="md:w-80 lg:w-96">
        <div className="bg-bgSurfaceElevated w-10/12 sm:w-80 h-[17rem] mx-auto mt-7 pt-10  rounded-2xl">
          <form className="w-10/12 sm:w-72 mx-auto flex flex-col gap-7">
            <div className="h-9 w-full flex items-center gap-4 bg-white rounded-xl pl-2.5">
              <Mail strokeOpacity={0.5} />
              <input
                type="text"
                name="email"
                value={inputFormSigninValue.emai}
                autoComplete="email"
                placeholder="Type your email"
                className="w-full placeholder:italic focus:outline-none ring-0"
                onChange={(input) => handleChangeInputSigninForm(input)}
              />
            </div>
            <div className="h-9 w-full flex justify-between items-center bg-white rounded-xl pl-2.5">
              <div className="flex items-center gap-4 h-full">
                <RectangleEllipsis strokeOpacity={0.5} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inputFormSigninValue.password}
                  autoComplete="current-password"
                  placeholder="Type your password"
                  className="w-full placeholder:italic focus:outline-none ring-0"
                  onChange={(input) => handleChangeInputSigninForm(input)}
                />
              </div>
              <div className="pr-2.5">{showPassword ? <EyeClosed onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" /> : <Eye onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />}</div>
            </div>
            <button type="submit" className="bg-bgInteractive h-9 rounded-xl font-medium cursor-pointer hover:bg-bgHighlight">
              Sign In
            </button>
          </form>
          <div className="ml-5 mt-5">
            <Link to="/auth/verify-email" className="text-blue-500 text-sm cursor-pointer">
              Forgotten Password?
            </Link>
          </div>
        </div>
        <div className="w-10/12 sm:w-64 h-10 bg-bgInteractive rounded-xl mx-auto mt-10 flex justify-center items-center hover:bg-bgHighlight cursor-pointer">
          <Link to="/auth/signup" className="font-medium">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPages;
