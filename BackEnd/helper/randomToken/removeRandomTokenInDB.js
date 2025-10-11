import { ObjectId } from "mongodb";
import { database } from "../../config/db";

export const removeRandomTokenInDB = async (dataIdetifier) => {
  try {
    const dbUser = await database();
    let resultAction = null;

    if (dataIdetifier._id) {
      const result = await dbUser.collection("users").updateOne({ _id: new ObjectId(dataIdetifier._id) }, { $unset: { randomToken: "", expiredRandomToken: "" } });
      resultAction = {
        success: true,
        code: 200,
        message: "Successfully removed random tokens",
        description: result,
      };
    } else if (dataIdetifier.email) {
      const result = await dbUser.collection("users").updateOne({ email: dataIdetifier.email }, { $unset: { randomToken: "", expiredRandomToken: "" } });
      resultAction = {
        success: true,
        code: 200,
        message: "Successfully removed random tokens",
        description: result,
      };
    }
    return resultAction;
  } catch (error) {
    const err = new Error(`An error occurred while deleting random tokens: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
