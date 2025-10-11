import { loadUser } from "../controllers/usersControllers";
import { changePassword } from "../helper/changePassword";
import { validateAccount } from "../helper/validateAccount";

export const changePasswordById = async (idUser, oldPassword, newPassword, randomToken, tokenSendingTime) => {
  try {
    const foundUser = await loadUser(idUser);

    if (foundUser.code !== 200) return { success: foundUser.success, code: foundUser.code, message: foundUser.message };

    if (oldPassword !== foundUser.data.password) return { success: false, code: 401, message: "Old password is incorrect!" };

    const dataValidateChangePassword = await validateAccount(foundUser, randomToken, tokenSendingTime);

    if (dataValidateChangePassword.code !== 200) return { success: dataValidateChangePassword.success, code: dataValidateChangePassword.code, message: dataValidateChangePassword.message };

    const resultChangePassword = await changePassword(foundUser.data._id, newPassword);

    if (resultChangePassword.code !== 200) return { success: resultChangePassword.success, code: resultChangePassword.code, message: resultChangePassword.message };

    return resultChangePassword;
  } catch (error) {
    const err = new Error(`An error occurred while validating data: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
