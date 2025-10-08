import { database } from "../config/db.js";
import { ObjectId } from "mongodb";
import { loadAllUsers } from "./controllers.js";
import { isSuperAdmin } from "../helper/isSuperAdmin.js";

export const loadUser = async (id) => {
  try {
    const allUsers = await loadAllUsers();
    const user = allUsers.data.find((user) => user._id.toString() === id);

    if (!user || user.length === 0) return { success: false, code: 404, message: "User kosong atau tidak ditemukan" };

    return {
      success: true,
      code: 200,
      message: `Berhasil mengambil user`,
      data: user,
    };
  } catch (error) {
    const err = new Error(`Error loadUser ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

export const findUser = async (email, password) => {
  try {
    const allUsers = await loadAllUsers();
    const foundUserByEmail = allUsers.data.find((user) => user.email === email);

    if (!foundUserByEmail) return { success: false, code: 404, message: `User dengan email ${email} tidak ditemukan` };

    const foundUserByPassword = foundUserByEmail.password === password;

    if (!foundUserByPassword) return { success: false, code: 404, message: "User tidak ditemukan" };

    return {
      success: true,
      code: 200,
      message: `Berhasil mendapatkan user`,
      data: foundUserByEmail,
    };
  } catch (error) {
    const err = new Error(`Error findUser ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

export const addUser = async (dataUser) => {
  try {
    const dbUsers = await database();
    const result = await dbUsers.collection("users").insertOne(dataUser);
    return {
      success: true,
      code: 200,
      message: `Berhasil menambahkan user`,
      data: dataUser,
      description: result,
    };
  } catch (error) {
    const err = new Error(`Error addUser ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

export const updateUserRole = async (admin, idUpdate, roleUpdate) => {
  try {
    const dbUsers = await database();
    if (!(await isSuperAdmin(admin))) {
      return { success: false, code: 403, message: "Hanya super admin yang bisa!" };
    }

    const result = await dbUsers.collection("users").updateOne({ _id: new ObjectId(idUpdate) }, { $set: { role: roleUpdate.role } });

    return { success: true, code: 200, message: `Role berhasil diupdate`, description: result };
  } catch (error) {
    const err = new Error(`Error updateUserRole ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

export const deleteUser = async (idDelete, dataUser) => {
  try {
    const dbUsers = await database();

    if (dataUser.role !== "super admin" && idDelete !== dataUser._id) return { success: false, code: 403, message: "Anda tidak memliki akses" };

    const result = await dbUsers.collection("users").deleteOne({ _id: new ObjectId(idDelete) });
    return {
      success: true,
      code: 200,
      message: `user id-${idDelete} berhasil dihapus`,
      description: result,
    };
  } catch (error) {
    const err = new Error(`Error deleteUser ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
