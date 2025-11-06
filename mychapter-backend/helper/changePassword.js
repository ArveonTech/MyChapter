import { database } from "../config/db.js";

export const changePassword = async (idUser, password) => {
  try {
    const dbUsers = await database();

    const result = dbUsers.collection("users").updateOne({ _id: new ObjectId(idUser) }, { $set: { password: password } });

    return {
      success: true,
      code: 200,
      message: "Password changed successfully",
      description: result,
    };
  } catch (error) {
    const err = new Error(`An error occurred while changing the password: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
