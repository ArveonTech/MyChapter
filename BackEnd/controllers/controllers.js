import { database } from "../config/db.js";

const loadDatabase = async (collection) => {
  try {
    const db = await database();
    const collectionData = await db.collection(collection).find().toArray();
    return collectionData;
  } catch (error) {
    console.info(`Gagal load database ${error.message}`);
  }
};

export const loadUsers = async () => {
  try {
    const Users = await loadDatabase("users");
    return Users;
  } catch (error) {
    console.info(`Gagal Load users ${error.message}`);
  }
};

export const loadUser = async (id) => {
  try {
    const users = await loadUsers();
    const user = users.find((user) => user._id.toString() === id);
    return user;
  } catch (error) {
    console.info(`Gagal Load user ${error.message}`);
  }
};

export const loadAllNotes = async () => {
  try {
    const notes = await loadDatabase("notes");
    return notes;
  } catch (error) {
    console.info(`Gagal Load All Notes ${error.message}`);
  }
};

export const loadNotes = async (userId) => {
  try {
    const allNotes = await loadAllNotes(userId);
    const notes = allNotes.filter((note) => note.userId === userId);
    return notes;
  } catch (error) {
    console.info(`Gagal Load Notes ${error.message}`);
  }
};

export const loadNote = async (id) => {
  try {
    const notes = await loadAllNotes();
    const noteUser = notes.find((note) => note._id.toString() === id);
    return noteUser;
  } catch (error) {
    console.info(`Gagal Load Notes ${error.message}`);
  }
};
