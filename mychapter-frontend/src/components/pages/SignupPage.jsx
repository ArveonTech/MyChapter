// components
import { SignupForm } from "@/components/common/signup/signup-form";
import UseAuthGuard from "@/hooks/UseAuthGuard";
import UseEmptyFormSignup from "@/hooks/UseEmptyFormSignup";
import { useEffect, useState } from "react";

// utils
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formSignup, setFormSignup] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorForm, setErrorForm] = useState(null);

  const [errorInputForm, setErrorInputForm] = useState({ success: null, inputForm: { username: null, email: null, password: null, confirmPassword: null } });

  const [showPassword, setShowPassword] = useState(false);

  const authGuard = UseAuthGuard();
  const emptyForm = UseEmptyFormSignup(formSignup);

  // useEffect(() => {
  //   if (authGuard === "valid") {
  //     navigate("/home");
  //   }
  // }, [authGuard]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setFormSignup((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emptyForm.success) return setErrorInputForm(emptyForm);

    setErrorInputForm({ success: null, inputForm: { username: null, email: null, password: null, confirmPassword: null } });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-bgPage flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-[400px]">
        <SignupForm formSignin={formSignup} handleChangeInput={handleChangeInput} handleSubmit={handleSubmit} errorForm={errorForm} showPassword={showPassword} handleShowPassword={handleShowPassword} errorInputForm={errorInputForm} />
      </div>
    </div>
  );
};

export default SignupPage;
