import { ObjectId } from "mongodb";
import { database } from "../../config/db.js";

const tokenExpirationTime = 300000;

// function to add random token to db
export const addRandomTokenInDB = async (idUser) => {
  try {
    const dbUsers = await database();
    let randomToken = "";

    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 7; i++) {
      const index = Math.floor(Math.random() * 62);
      token += chars[index];
    }
    const expiredRandomToken = Date.now() + tokenExpirationTime;
    const result = await dbUsers.collection("users").updateOne({ _id: new ObjectId(idUser) }, { $set: { randomToken, expiredRandomToken } });
    return {
      success: true,
      code: 200,
      message: "Token expiry property added successfully",
      data: randomToken,
      description: result,
    };
  } catch (error) {
    const err = new Error(`An error occurred while adding the token expiration property: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
