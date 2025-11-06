import { useEffect, useState } from "react";
import ImageWithCaptionSigninComponents from "../molecules/ImageWithCaptionSigninComponent";
import FormSigninComponent from "../organisms/FormSigninComponent";
import { requestBE } from "../../libs/requestBE-lib";
import { useNavigate } from "react-router-dom";
import UseAuthGuard from "../../hooks/UseAuthGuard";
import LoadingPage from "./LoadingPage";

const SigninPage = () => {
  const navigate = useNavigate();

  const [inputFormSigninValue, setinputFormSigninValue] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorFormSubmit, setErrorFormSubmit] = useState(null);
  const verifyToken = UseAuthGuard();

  useEffect(() => {
    if (verifyToken === "valid") {
      navigate("/home");
    }
  }, [verifyToken]);

  const attributEmail = {
    type: "text",
    name: "email",
    value: inputFormSigninValue.email,
    autoComplete: "email",
    placeholder: "Type your email",
    required: true,
  };

  const attributPassword = {
    type: showPassword ? "text" : "password",
    name: "password",
    value: inputFormSigninValue.password,
    autoComplete: "current-password",
    placeholder: "Type your password",
    required: true,
  };

  const handleChangeInputForm = (input) => {
    const { name, value } = input.target;

    setinputFormSigninValue((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmitFormSignin = async (e) => {
    e.preventDefault();

    if (!inputFormSigninValue.email.trim() || !inputFormSigninValue.password.trim()) {
      setErrorFormSubmit("Email & Password required!");
      return;
    }

    setErrorFormSubmit(null);

    try {
      const response = await requestBE("POST", "auth/signin", inputFormSigninValue, "", { "Content-Type": "application/json", withCredentials: true });

      const username = response?.data?.username;
      const accessToken = response?.data?.accessToken;

      if (!accessToken) return setErrorFormSubmit("No access token returned");

      localStorage.setItem("access-token", accessToken);

      navigate("/home", { state: { status: "login", username } });
    } catch (err) {
      const message = err?.response?.data || "Something went wrong!";
      setErrorFormSubmit(message);
    }
  };

  return (
    <>
      {verifyToken === "loading" ? (
        <LoadingPage />
      ) : (
        <div className="min-h-screen bg-bgPage md:flex md:justify-center md:items-center md:gap-40 md:px-10 pb-5">
          <div className="md:w-80 lg:w-96 md:flex md:justify-center">
            <ImageWithCaptionSigninComponents />
          </div>
          <FormSigninComponent
            attributEmail={attributEmail}
            attributPassword={attributPassword}
            handleChangeInputForm={handleChangeInputForm}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleSubmitFormSignin={handleSubmitFormSignin}
            errorFormSubmit={errorFormSubmit}
          />
        </div>
      )}
    </>
  );
};

export default SigninPage;
