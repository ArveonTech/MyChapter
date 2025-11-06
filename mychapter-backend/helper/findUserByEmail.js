import { loadAllUsers } from "../controllers/controllers.js";

export const findUserByEmail = async (email) => {
  try {
    const allUsers = await loadAllUsers();

    if (allUsers.code !== 200) return { success: allUsers.success, code: allUsers.code, message: allUsers.message };

    const foundUserByEmail = allUsers.data.find((user) => user.email === email);

    if (!foundUserByEmail) return { success: false, code: 404, message: `User with email ${email} cannot be found` };

    return {
      success: true,
      code: 200,
      message: `Managed to get users`,
      data: foundUserByEmail,
    };
  } catch (error) {
    const err = new Error(`An error occurred while retrieving email data: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
