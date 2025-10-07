import { database } from "../config/db.js";
import { loadDatabase, loadAllNotes } from "./controllers.js";

// fungsi menampilkan seluruh notes user
export const loadNotes = async (userId) => {
  try {
    const allNotes = await loadAllNotes();
    if (allNotes.message) return { message: allNotes.message };
    const allNotesUser = allNotes.filter((note) => note.userId === userId);
    if (!allNotesUser || allNotesUser.length === 0) return { success: false, code: 404, message: "tidak ada notes user" };
    const dataNotes = {
      success: true,
      code: 200,
      message: "berhasil memgambil notes user",
      data: allNotesUser,
    };
    return dataNotes;
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "terjadi error saat mengambil data notes user",
    };
  }
};

// fungsi menampilkan 1 note user
export const loadNote = async (id) => {
  try {
    const allNotes = await loadDatabase("notes");
    const noteUser = allNotes.find((note) => note._id.toString() === id);
    if (!noteUser || noteUser.length === 0) return { message: "tidak ada note" };
    return noteUser;
  } catch (error) {
    console.info(`Gagal Load Note ${error.message}`);
  }
};

// fungsi menambah note
export const addNote = async (userId, data) => {
  try {
    const dbNotes = await database();
    const noteData = { ...userId, data };
    const result = await dbNotes.collection("notes").insertOne(noteData);
    return { message: "Berhasil menambahkan note", result };
  } catch (error) {
    console.info(`Gagal Add Note ${error.message}`);
  }
};
