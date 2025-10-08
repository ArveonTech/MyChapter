import { database } from "../config/db.js";

// controllers utama
export const loadDatabase = async (collection) => {
  try {
    const db = await database();
    const collectionData = await db.collection(collection).find().toArray();
    return collectionData;
  } catch (error) {
    const err = new Error(`Error loadDatabase ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

export const loadAllUsers = async () => {
  try {
    const allUsers = await loadDatabase("users");

    if (!allUsers || allUsers.length === 0) return { success: true, code: 200, message: "Collection Users kosong atau tidak ditemukan", data: allUsers };

    return {
      success: true,
      code: 200,
      message: `Berhasil mengambil data users`,
      data: allUsers,
    };
  } catch (error) {
    const err = new Error(`Error loadAllUsers ${error.message}`);
    err.sucess = false;
    err.code = 500;
    throw err;
  }
};

export const loadAllNotes = async () => {
  try {
    const allNotes = await loadDatabase("notes");

    if (!allNotes || allNotes.length === 0) return { success: true, code: 200, message: "Collection Notes kosong atau tidak ditemukan", data: allNotes };

    return {
      success: true,
      code: 200,
      message: `Berhasil mengambil data notes`,
      data: allNotes,
    };
  } catch (error) {
    const err = new Error(`Error loadDatabase ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
