import { findUserByEmail } from "../helper/findUserByEmail.js";
import { validateAccount } from "../helper/validateAccount.js";

export const validateForgotPassword = async (email, randomToken, tokenSendingTime) => {
  try {
    const foundUser = await findUserByEmail(email);

    if (foundUser.code !== 200) return { success: foundUser.success, code: foundUser.code, message: foundUser.message };

    const dataValidateForgotPassword = await validateAccount(foundUser, randomToken, tokenSendingTime);

    if (dataValidateForgotPassword.code !== 200) return { success: dataValidateForgotPassword.success, code: dataValidateForgotPassword.code, message: dataValidateForgotPassword.message };

    return {
      success: true,
      code: 200,
      message: "Account validation successful",
      data: foundUser,
    };
  } catch (error) {
    const err = new Error(`An error occurred while validating data: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
