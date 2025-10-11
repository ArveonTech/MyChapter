import { ObjectId } from "mongodb";
import { database } from "../config/db.js";
import { loadDatabase, loadAllNotes } from "./controllers.js";

// function to display all user notes by id
export const loadNotes = async (userId) => {
  try {
    const allNotes = await loadAllNotes();
    if (allNotes.code === 500) return { message: allNotes.message };

    const allNotesUser = allNotes.data.filter((note) => note.userId === userId);

    if (!allNotesUser || allNotesUser.length === 0) return { success: true, code: 200, message: "No user notes", data: allNotesUser };

    const dataNotes = {
      success: true,
      code: 200,
      message: "Successfully retrieved user notes",
      data: allNotesUser,
    };
    return dataNotes;
  } catch (error) {
    const err = new Error(`An error occurred while retrieving user notes: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// note display function by id
export const loadNote = async (id) => {
  try {
    const allNotes = await loadDatabase("notes");
    const noteUser = allNotes.find((note) => note._id.toString() === id);

    if (!noteUser || noteUser.length === 0) return { success: false, code: 404, message: "No notes" };

    return {
      success: true,
      code: 200,
      message: "Managed to take notes",
      data: noteUser,
    };
  } catch (error) {
    const err = new Error(`An error occurred while taking notes: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// function of adding notes by id
export const addNote = async (userId, data) => {
  try {
    const noteData = { userId: userId, ...data };
    const dbNotes = await database();
    const result = await dbNotes.collection("notes").insertOne(noteData);
    return { success: true, code: 200, message: "Successfully added note", desciption: result };
  } catch (error) {
    const err = new Error(`An error occurred while adding a record: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// note editing function by id
export const updateNote = async (idNote, dataNote) => {
  try {
    const dataNoteNew = { ...dataNote };
    delete dataNoteNew._id;
    const dbNotes = await database();
    const result = await dbNotes.collection("notes").updateOne({ _id: new ObjectId(idNote) }, { $set: dataNoteNew });

    return {
      success: true,
      code: 200,
      message: `note with id-${idNote} successfully updated`,
      description: result,
    };
  } catch (error) {
    const err = new Error(`an error occurred while updating user notes: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

// note delete function by id
export const deleteNote = async (idNote) => {
  try {
    const dbNotes = await database();
    const result = await dbNotes.collection("notes").deleteOne({ _id: new ObjectId(idNote) });

    return {
      success: true,
      code: 200,
      message: `Note with id-${idNote} successfully deleted`,
      description: result,
    };
  } catch (error) {
    const err = new Error(`An error occurred while deleting user notes: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
