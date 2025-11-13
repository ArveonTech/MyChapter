// components
import { LoginForm } from "@/components/common/signin/login-form";
import UseAuthGuard from "@/hooks/UseAuthGuard";
import { requestBE } from "@/lib/requestBE-lib";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();
  const [formSignin, setFormSignin] = useState({
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const authGuard = UseAuthGuard();

  useEffect(() => {
    if (authGuard === "valid") {
      navigate("/home");
    }
  }, [authGuard]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setFormSignin((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await requestBE("POST", "auth/signin", formSignin, "", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.code < 200 || response.code >= 300) {
        throw new Error("Access token invalid");
      }

      const accessToken = response.data?.accessToken;

      localStorage.setItem("access-token", accessToken);

      navigate("/home", { state: { from: "login", username: response.data.accessToken } });
    } catch (err) {
      setErrorForm(err);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-bgPage flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-96">
        <LoginForm formSignin={formSignin} handleChangeInput={handleChangeInput} handleSubmit={handleSubmit} errorForm={errorForm} showPassword={showPassword} handleShowPassword={handleShowPassword} />
      </div>
    </div>
  );
};

export default SigninPage;
