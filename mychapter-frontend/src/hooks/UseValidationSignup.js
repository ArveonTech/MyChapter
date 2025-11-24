import { useEffect, useState } from "react";
import validator from "validator";

const UseValidationSignup = ({ form }) => {
  const [errorInputForm, setErrorInputForm] = useState({
    success: true,
    inputForm: {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
  });

  useEffect(() => {
    let newErrors = {
      success: true,
      inputForm: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
    };

    if (form.username && form.username.length < 3) {
      newErrors.success = false;
      newErrors.inputForm.username = "Name must be at least 3 characters!";
    }

    if (form.email && !validator.isEmail(form.email)) {
      newErrors.success = false;
      newErrors.inputForm.email = "Invalid email!";
    }

    if (
      form.password &&
      !validator.isStrongPassword(form.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      newErrors.success = false;
      newErrors.inputForm.password = "Password must be at least 8 chars, contain uppercase & numbers!";
    }

    if (form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.success = false;
      newErrors.inputForm.confirmPassword = "Passwords do not match!";
    }

    setErrorInputForm(newErrors);
  }, [form]);

  return errorInputForm;
};

export default UseValidationSignup;
