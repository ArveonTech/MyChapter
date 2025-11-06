import { useEffect, useState } from "react";
import FormSignupComponent from "../organisms/FormSignupComponent";
import { useNavigate } from "react-router-dom";
import ImageComponents from "../atoms/imageComponent";
import UseEmptyFormSignup from "../../hooks/UseEmptyFormSignup";
import UseValidationSignup from "../../hooks/UseValidationSignup";
import { requestBE } from "../../libs/requestBE-lib";
import UseAuthGuard from "../../hooks/UseAuthGuard";
import LoadingPage from "./LoadingPage";

const SignupPage = () => {
  const navigate = useNavigate();
  const [inputFormSignupValue, setinputFormSignupValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorInputForm, setErrorInputForm] = useState({
    success: true,
    inputForm: {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
  });
  const [errorFormSubmit, setErrorFormSubmit] = useState(null);

  const errorEmptyForm = UseEmptyFormSignup(inputFormSignupValue);
  const errorInvalidForm = UseValidationSignup(inputFormSignupValue);
  const verifyToken = UseAuthGuard();

  useEffect(() => {
    if (verifyToken === "valid") {
      navigate("/home");
    }
  }, [verifyToken]);

  const handleChangeInputForm = (e) => {
    const { name, value } = e.target;
    setinputFormSignupValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitFormSignup = async (e) => {
    const inputValid = {
      success: true,
      inputForm: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
    };
    e.preventDefault();

    if (!errorEmptyForm.success) return setErrorInputForm(errorEmptyForm);
    if (!errorInvalidForm.success) return setErrorInputForm(errorInvalidForm);

    setErrorInputForm(inputValid);

    const { confirmPassword, ...restInput } = inputFormSignupValue;

    try {
      const response = await requestBE("POST", "auth/signup", restInput, "", { "Content-Type": "application/json", withCredentials: true });

      const username = response?.data?.username;
      const accessToken = response?.data?.accessToken;

      if (!accessToken) return setErrorFormSubmit("No access token returned");

      localStorage.setItem("access-token", accessToken);

      navigate("/home", { state: { status: "login", username } });
    } catch (err) {
      const message = err?.response?.data.error || "Something went wrong!";
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
            <div className="w-8/12 sm:w-72 mx-auto md:mx-0 md:w-80 lg:w-96">
              <ImageComponents imageSource="/images/signup_image.png" alternativeImage="Signup-image" />
            </div>
          </div>
          <FormSignupComponent
            attributUsername={{ name: "username", type: "text", value: inputFormSignupValue.username, placeholder: "john doe" }}
            attributEmail={{ name: "email", type: "text", value: inputFormSignupValue.email, placeholder: "johndoe@gmail.com" }}
            attributPassword={{ name: "password", type: showPassword ? "text" : "password", value: inputFormSignupValue.password, placeholder: "create password" }}
            attributConfirmPassword={{ name: "confirmPassword", type: "password", value: inputFormSignupValue.confirmPassword, placeholder: "confirm password" }}
            handleChangeInputForm={handleChangeInputForm}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleSubmitFormSignup={handleSubmitFormSignup}
            errorInputForm={errorInputForm}
            errorFormSubmit={errorFormSubmit}
          />
        </div>
      )}
    </>
  );
};

export default SignupPage;
