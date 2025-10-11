export const validateAccount = async (foundUser, randomToken, tokenSendingTime) => {
  try {
    if (foundUser.data.code !== 200) return { success: foundUser.success, code: foundUser.code, message: foundUser.message };

    if (tokenSendingTime < foundUser.data.expiredRandomToken) return { success: false, code: 401, message: "Token has expired" };

    if (randomToken !== foundUser.data.randomToken) return { success: false, code: 401, message: "Random token is wrong" };

    return {
      success: true,
      code: 200,
    };
  } catch (error) {
    const err = new Error(`An error occurred while validating the password change.: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
