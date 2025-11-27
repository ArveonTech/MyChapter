// utils
import UseEmptyFormSignup from "@/hooks/UseEmptyFormSignup";
import UseValidationSignup from "@/hooks/UseValidationSignup";
import { requestBE } from "@/lib/requestBE-lib";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { SignupForm } from "@/components/common/signup/signup-form";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formSignup, setFormSignup] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorForm, setErrorForm] = useState(null);

  const [errorInputForm, setErrorInputForm] = useState({ success: true, inputForm: { username: null, email: null, password: null, confirmPassword: null } });

  const [showPassword, setShowPassword] = useState(false);

  const emptyForm = UseEmptyFormSignup({ form: formSignup });
  const invalidForm = UseValidationSignup({ form: formSignup });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setFormSignup((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emptyForm.success) return setErrorInputForm(emptyForm);
    if (!invalidForm.success) return setErrorInputForm(invalidForm);

    setErrorInputForm({ success: true, inputForm: { username: null, email: null, password: null, confirmPassword: null } });

    const { confirmPassword, ...form } = formSignup;

    try {
      const response = await requestBE("POST", "auth/signup", form, "", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = response.data?.accessToken;

      localStorage.setItem("access-token", accessToken);

      navigate("/home", { state: { from: "signup", username: response.data?.username } });
    } catch (err) {
      setErrorForm(err);
    }
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
