import { database } from "../config/db.js";

// controllers utama
export const loadDatabase = async (collection) => {
  try {
    const db = await database();
    const collectionData = await db.collection(collection).find().toArray();
    return collectionData;
  } catch (error) {
    console.info(`Gagal load database ${error.message}`);
  }
};

export const loadAllUsers = async () => {
  try {
    const allUsers = await loadDatabase("users");
    if (!allUsers || allUsers.length === 0) return { message: "Collection Users kosong atau tidak ditemukan" };
    return allUsers;
  } catch (error) {
    console.info(`Gagal Load users ${error.message}`);
  }
};

export const loadAllNotes = async () => {
  try {
    const allNotes = await loadDatabase("notes");
    if (!allNotes || allNotes.length === 0) return { message: "tidak ada semua notes" };
    return allNotes;
  } catch (error) {
    console.info(`Gagal Load All Notes ${error.message}`);
  }
};
