import { ObjectId } from "mongodb";
import { database } from "../config/db.js";
import { loadDatabase, loadAllNotes } from "./controllers.js";

// fungsi menampilkan seluruh notes user
export const loadNotes = async (userId) => {
  try {
    const allNotes = await loadAllNotes();
    if (allNotes.code === 500) return { message: allNotes.message };

    const allNotesUser = allNotes.data.filter((note) => note.userId === userId);

    if (!allNotesUser || allNotesUser.length === 0) return { success: true, code: 200, message: "Tidak ada notes user", data: allNotesUser };

    const dataNotes = {
      success: true,
      code: 200,
      message: "Berhasil mengambil notes user",
      data: allNotesUser,
    };
    return dataNotes;
  } catch (error) {
    const err = new Error(`Terjadi error saat mengambil data notes user ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// fungsi menampilkan 1 note user
export const loadNote = async (id) => {
  try {
    const allNotes = await loadDatabase("notes");
    const noteUser = allNotes.find((note) => note._id.toString() === id);

    if (!noteUser || noteUser.length === 0) return { success: false, code: 404, message: "tidak ada note" };

    return {
      success: true,
      code: 200,
      message: "Berhasil mengambil note",
      return: noteUser,
    };
  } catch (error) {
    const err = new Error(`Terjadi error saat mengambil data note user ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// fungsi menambah note
export const addNote = async (userId, data) => {
  try {
    const noteData = { userId: userId, ...data };
    const dbNotes = await database();
    const result = await dbNotes.collection("notes").insertOne(noteData);
    return { success: true, code: 200, message: "Berhasil menambahkan note", desciption: result };
  } catch (error) {
    const err = new Error(`Terjadi error saat menambah data note user ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// fungsi edit note
export const updateNote = async (idNote, dataNote) => {
  try {
    const dbNotes = await database();
    const result = await dbNotes.collection("users").updateOne({ _id: new ObjectId(idNote) }, { $set: dataNote });

    return {
      success: true,
      code: 200,
      message: `user id-${idDelete} berhasil dihapus`,
      description: result,
    };
  } catch (error) {
    const err = new Error(`Terjadi error saat mengedit data note user ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
