import { Link } from "react-router-dom";
import ButtonComponents from "../atoms/buttonComponent";
import EmailField from "../molecules/inputMolecules/EmailField";
import PasswordField from "../molecules/inputMolecules/PasswordField";
import CreateAccount from "../molecules/CreateAccount";

const FormSigninComponent = ({ attributEmail, attributPassword, handleChangeInputForm, showPassword, setShowPassword, handleSubmitFormSignin, errorFormSubmit }) => {
  return (
    <div className="bg-bgSurfaceElevated w-10/12 sm:w-80 mx-auto md:mx-0 mt-7 pt-10 pb-6 rounded-2xl flex flex-col items-center">
      <form className="w-10/12 sm:w-72 flex flex-col gap-7" onSubmit={handleSubmitFormSignin}>
        {errorFormSubmit && <p className="text-center text-red-500">{errorFormSubmit}</p>}
        <EmailField attributEmail={attributEmail} handleChangeInputForm={handleChangeInputForm} />
        <PasswordField attributPassword={attributPassword} handleChangeInputForm={handleChangeInputForm} showPassword={showPassword} setShowPassword={setShowPassword} />
        <ButtonComponents className="bg-bgInteractive h-9 rounded-xl font-medium cursor-pointer hover:bg-bgHighlight" content="Sign in" />
      </form>

      <div className="mt-5">
        <Link to="/auth/verify-email" className="text-blue-500 text-sm cursor-pointer">
          Forgotten Password?
        </Link>
      </div>
    </div>
  );
};

const FormSigninWithFooter = (props) => (
  <div className="flex flex-col items-center">
    <FormSigninComponent {...props} />
    <div className="mt-4">
      <CreateAccount />
    </div>
  </div>
);

export default FormSigninWithFooter;
