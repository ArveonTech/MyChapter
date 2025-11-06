import { Link } from "react-router-dom";
import ButtonComponents from "../atoms/buttonComponent";
import UsernameField from "../molecules/inputMolecules/UsernameField";
import EmailField from "../molecules/inputMolecules/EmailField";
import PasswordField from "../molecules/inputMolecules/PasswordField";
import ConfirmPasswordField from "../molecules/ConfirmPasswordField";

const FormSignupComponent = ({ attributUsername, attributEmail, attributPassword, attributConfirmPassword, handleChangeInputForm, showPassword, setShowPassword, handleSubmitFormSignup, errorInputForm, errorFormSubmit }) => {
  return (
    <div className="bg-bgSurfaceElevated w-10/12 sm:w-80 mx-auto md:mx-0 mt-7 pt-5 pb-6 rounded-2xl flex flex-col items-center">
      {errorFormSubmit && <p className="text-center text-red-500 mb-5">*{errorFormSubmit}</p>}
      <form className="w-10/12 sm:w-72 flex flex-col gap-7" onSubmit={handleSubmitFormSignup}>
        <div>
          <UsernameField attributUsername={attributUsername} handleChangeInputForm={handleChangeInputForm} />
          {!errorInputForm.success && errorInputForm.inputForm.username && <p className="text-red-500 mt-2 text-xs">*{errorInputForm.inputForm.username}</p>}
        </div>

        <div>
          <EmailField attributEmail={attributEmail} handleChangeInputForm={handleChangeInputForm} />
          {!errorInputForm.success && errorInputForm.inputForm.email && <p className="text-red-500 mt-2 text-xs">*{errorInputForm.inputForm.email}</p>}
        </div>

        <div>
          <PasswordField attributPassword={attributPassword} handleChangeInputForm={handleChangeInputForm} showPassword={showPassword} setShowPassword={setShowPassword} />
          {!errorInputForm.success && errorInputForm.inputForm.password && <p className="text-red-500 mt-2 text-xs">*{errorInputForm.inputForm.password}</p>}
        </div>

        <div>
          <ConfirmPasswordField attributConfirmPassword={attributConfirmPassword} handleChangeInputForm={handleChangeInputForm} />
          {!errorInputForm.success && errorInputForm.inputForm.confirmPassword && <p className="text-red-500 mt-2 text-xs">*{errorInputForm.inputForm.confirmPassword}</p>}
        </div>

        <ButtonComponents className="bg-bgInteractive h-9 rounded-xl font-medium hover:bg-bgHighlight" content="Sign Up" />
      </form>
    </div>
  );
};

const FormSignupWithFooter = (props) => (
  <div className="flex flex-col items-center">
    <FormSignupComponent {...props} />
    <div className="mt-7">
      <Link to="/auth/signin" className="text-blue-500 underline">
        Signin?
      </Link>
    </div>
  </div>
);

export default FormSignupWithFooter;
