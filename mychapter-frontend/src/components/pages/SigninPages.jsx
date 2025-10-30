import { useState } from "react";
import ImageWithCaptionSigninComponents from "../molecules/ImageWithCaptionSigninComponent";
import FormSigninComponent from "../organisms/FormSigninComponent";

const SigninPages = () => {
  const [inputFormSigninValue, setinputFormSigninValue] = useState({
    email: "",
    password: "",
  });

  const handleChangeInputSigninForm = (input) => {
    const { name, value } = input.target;

    setinputFormSigninValue((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  console.info(inputFormSigninValue);

  const [showPassword, setShowPassword] = useState(false);

  const attributEmail = {
    type: "text",
    name: "email",
    value: inputFormSigninValue.email,
    autoComplete: "email",
    placeholder: "Type your email",
  };

  const attributPassword = {
    type: showPassword ? "text" : "password",
    name: "password",
    value: inputFormSigninValue.password,
    autoComplete: "current-password",
    placeholder: "Type your password",
  };

  return (
    <div className="min-h-screen bg-bgPage md:flex md:justify-center md:items-center md:gap-40 md:px-10 pb-5">
      <div className="md:w-80 lg:w-96 md:flex md:justify-center">
        <ImageWithCaptionSigninComponents />
      </div>
      <FormSigninComponent attributEmail={attributEmail} attributPassword={attributPassword} handleChangeInputSigninForm={handleChangeInputSigninForm} showPassword={showPassword} setShowPassword={setShowPassword} />
    </div>
  );
};

export default SigninPages;
