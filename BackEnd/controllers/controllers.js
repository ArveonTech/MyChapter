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
    const allUsers = await loadDatabase("users");
    if (!allUsers || allUsers.length === 0) return { message: "Collection Users kosong atau tidak ditemukan" };

    return allUsers;
  } catch (error) {
    console.info(`Gagal Load users ${error.message}`);
  }
};

export const loadUser = async (id) => {
  try {
    const allUsers = await loadUsers();
    const user = allUsers.find((user) => user._id.toString() === id);

    if (!user || user.length === 0) return { message: "User kosong atau tidak ditemukan" };

    return user;
  } catch (error) {
    console.info(`Gagal Load user ${error.message}`);
  }
};

export const findUser = async (email, password) => {
  try {
    const allUsers = await loadUsers();

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

export const updateUserRole = async (id, role) => {
  try {
    const dbUsers = await database();
    console.log(role);
    const result = await dbUsers.collection("users").updateOne({ _id: id }, { $set: { role } });
    return result;
  } catch (error) {
    console.info(`Gagal update role user ${error.message}`);
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

export const loadNotes = async (userId) => {
  try {
    const allNotes = await loadAllNotes();
    const allNotesUser = allNotes.filter((note) => note.userId === userId);

    if (!allNotesUser || allNotesUser.length === 0) return { message: "tidak ada notes user" };

    return allNotesUser;
  } catch (error) {
    console.info(`Gagal Load Notes ${error.message}`);
  }
};

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

export const addNote = async (userId, data) => {
  try {
  } catch (error) {
    console.info(`Gagal Add Note ${error.message}`);
  }
};
