import { useState, useEffect } from "react";

const UseEmptyFormSignup = (form) => {
  const [errorInputForm, setErrorInputForm] = useState({ success: null, inputForm: { username: null, email: null, password: null, confirmPassword: null } });

  useEffect(() => {
    const emptyForm = Object.keys(form).filter((key) => form[key].trim() === "");

    if (emptyForm.length > 0) {
      const updatedErrors = { success: false, inputForm: { username: null, email: null, password: null, confirmPassword: null } };

      emptyForm.forEach((field) => {
        updatedErrors.inputForm[field] = `${field === "confirmPassword" ? "confirm-password" : field} is required!`;
      });

      setErrorInputForm(updatedErrors);
    } else {
      setErrorInputForm({ success: true, inputForm: { username: null, email: null, password: null, confirmPassword: null } });
    }
  }, [form]);

  return errorInputForm;
};

export default UseEmptyFormSignup;
