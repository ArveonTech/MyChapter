import { database } from "../config/db.js";
import { ObjectId } from "mongodb";
import { loadAllUsers } from "./controllers.js";
import { findUserByEmail } from "../helper/findUserByEmail.js";

// function fetch user by id
export const loadUser = async (id) => {
  try {
    const allUsers = await loadAllUsers();
    const user = allUsers.data.find((user) => user._id.toString() === id);

    if (!user || user.length === 0) return { success: false, code: 404, message: "User not found" };

    return {
      success: true,
      code: 200,
      message: `Successfully retrieved user data`,
      data: user,
    };
  } catch (error) {
    const err = new Error(`An error occurred while retrieving user data: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// function to retrieve users based on email and password
export const findUser = async (email, password) => {
  try {
    const dataFindUserByEmail = await findUserByEmail(email);

    if (dataFindUserByEmail.code !== 200) return { success: dataFindUserByEmail.success, code: dataFindUserByEmail.code, message: dataFindUserByEmail.message };

    const foundUserByPassword = dataFindUserByEmail.data.password === password;

    if (!foundUserByPassword) return { success: false, code: 404, message: "Wrong password" };

    return dataFindUserByEmail;
  } catch (error) {
    const err = new Error(`An error occurred while searching for the user: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// function of adding users
export const addUser = async (dataLogin) => {
  try {
    const dataUser = { role: "user", avatar: "avatar-1", createdAt: new Date(), ...dataLogin };
    const dbUsers = await database();
    const result = await dbUsers.collection("users").insertOne(dataUser);

    const user = await dbUsers.collection("users").findOne({ _id: result.insertedId });

    return {
      success: true,
      code: 200,
      message: `Successfully added user`,
      data: user,
      description: result,
    };
  } catch (error) {
    const err = new Error(`An error occurred while adding a user: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// change Username
export const changeProfile = async (idUser, dataUser, idUserNote) => {
  try {
    if (idUser !== idUserNote) return { success: false, code: 401, message: "You don't have access!" };

    const dataUserDB = await loadUser(idUser);
    const { password, ...rest } = dataUserDB.data;

    const dbUsers = await database();
    const { _id, ...dataNew } = dataUser;
    const updateData = { ...dataNew, password };

    const result = await dbUsers.collection("users").updateOne({ _id: new ObjectId(idUser) }, { $set: updateData });
    return {
      success: true,
      code: 200,
      message: `User successfully updated`,
      description: result,
    };
  } catch (error) {
    const err = new Error(`An error occurred while updating user: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
