import { changePassword } from "../helper/changePassword";

export const resetPassword = async (idUser, newPassword) => {
  try {
    const resultChangePassword = await changePassword(idUser, newPassword);

    if (resultChangePassword.code !== 200) return { success: resultChangePassword.success, code: resultChangePassword.code, message: resultChangePassword.message };

    return resultChangePassword;
  } catch (error) {
    const err = new Error(`An error occurred while validating data: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
