import { database } from "../config/db.js";
import { ObjectId } from "mongodb";
import { loadAllUsers } from "./controllers.js";
import { isSuperAdmin } from "../helper/isSuperAdmin.js";
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

// role changing function
export const updateUserRole = async (admin, idUpdate, roleUpdate) => {
  try {
    const dbUsers = await database();
    if (!(await isSuperAdmin(admin))) {
      return { success: false, code: 403, message: "You don't have access!" };
    }

    const result = await dbUsers.collection("users").updateOne({ _id: new ObjectId(idUpdate) }, { $set: { role: roleUpdate.role } });

    return { success: true, code: 200, message: `Role successfully updated`, description: result };
  } catch (error) {
    const err = new Error(`An error occurred while updating the role: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// user delete function
export const deleteUser = async (idDelete, dataUser) => {
  try {
    const foundUser = await loadUser(idDelete);

    if (foundUser.code !== 200) return { success: foundUser.success, code: foundUser.code, message: foundUser.message };

    if (dataUser.role !== "super admin" && idDelete !== dataUser._id) return { success: false, code: 403, message: "You don't have access!" };

    const dbUsers = await database();

    const result = await dbUsers.collection("users").deleteOne({ _id: new ObjectId(idDelete) });
    return {
      success: true,
      code: 200,
      message: `User with id-${idDelete} successfully deleted`,
      description: result,
    };
  } catch (error) {
    const err = new Error(`An error occurred while deleting the user: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
