import { loadUser } from "../controllers/usersControllers.js";
import { changePassword } from "../helper/changePassword.js";

export const changePasswordById = async (idUser, newPassword) => {
  try {
    const foundUser = await loadUser(idUser);

    if (foundUser.code !== 200) return { success: foundUser.success, code: foundUser.code, message: foundUser.message };

    if (dataValidateChangePassword.code !== 200) return { success: dataValidateChangePassword.success, code: dataValidateChangePassword.code, message: dataValidateChangePassword.message };

    const resultChangePassword = await changePassword(foundUser.data._id, newPassword);

    if (resultChangePassword.code !== 200) return { success: resultChangePassword.success, code: resultChangePassword.code, message: resultChangePassword.message };

    return resultChangePassword;
  } catch (error) {
    const err = new Error(`An error occurred while changing the password: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
