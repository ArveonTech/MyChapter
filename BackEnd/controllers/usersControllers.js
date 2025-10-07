import { database } from "../config/db.js";
import { ObjectId } from "mongodb";
import { loadAllUsers } from "./controllers.js";
import { isSuperAdmin } from "../helper/isSuperAdmin.js";

export const loadUser = async (id) => {
  try {
    const allUsers = await loadAllUsers();
    const user = allUsers.find((user) => user._id.toString() === id);

    if (!user || user.length === 0) return { message: "User kosong atau tidak ditemukan" };

    return user;
  } catch (error) {
    console.info(`Gagal Load user ${error.message}`);
  }
};

export const findUser = async (email, password) => {
  try {
    const allUsers = await loadAllUsers();

    const foundUserByEmail = allUsers.find((user) => user.email === email);
    const foundUserByPassword = foundUserByEmail.password === password;

    if (!foundUserByEmail) return { message: "User dengan email tidak ditemukan" };

    if (!foundUserByPassword) return { message: "User dengan password tidak ditemukan" };

    return foundUserByEmail;
  } catch (error) {
    console.info(`Gagal Find User ${error.message}`);
  }
};

export const addUser = async (dataUser) => {
  try {
    const dbUsers = await database();
    const result = await dbUsers.collection("users").insertOne(dataUser);
    return { dataUser, id: result._id };
  } catch (error) {
    console.info(`Gagal Add User ${error.message}`);
  }
};

export const updateUserRole = async (admin, idUpdate, roleUpdate) => {
  try {
    const dbUsers = await database();
    if (!(await isSuperAdmin(admin))) {
      return { message: "Hanya super admin yang bisa!" };
    }
    const result = await dbUsers.collection("users").updateOne({ _id: new ObjectId(idUpdate) }, { $set: { role: roleUpdate.role } });
    return { message: `role berhasil diupdate`, result };
  } catch (error) {
    console.info(`Gagal update role user ${error.message}`);
  }
};

export const deleteUser = async (id) => {
  try {
    const dbUsers = await database();
    const result = await dbUsers.collection("users").deleteOne({ _id: new ObjectId(id) });
    return { message: `user id-${id} berhasil dihapus`, result };
  } catch (error) {
    console.info(`Gagal delete user ${error.message}`);
  }
};
