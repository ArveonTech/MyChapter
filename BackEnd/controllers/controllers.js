import { database } from "../config/db.js";

// main controller
export const loadDatabase = async (collection) => {
  try {
    const db = await database();
    const collectionData = await db.collection(collection).find().toArray();
    return collectionData;
  } catch (error) {
    const err = new Error(`Failed to load database: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

export const loadAllUsers = async () => {
  try {
    const allUsers = await loadDatabase("users");

    if (!allUsers || allUsers.length === 0) {
      return {
        success: true,
        code: 200,
        message: "The 'users' collection is empty or was not found.",
        data: allUsers,
      };
    }

    return {
      success: true,
      code: 200,
      message: "Successfully retrieved the users collection.",
      data: allUsers,
    };
  } catch (error) {
    const err = new Error(`Failed to retrieve users collection: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};

export const loadAllNotes = async () => {
  try {
    const allNotes = await loadDatabase("notes");

    if (!allNotes || allNotes.length === 0) {
      return {
        success: true,
        code: 200,
        message: "The 'notes' collection is empty or was not found.",
        data: allNotes,
      };
    }

    return {
      success: true,
      code: 200,
      message: "Successfully retrieved notes collection.",
      data: allNotes,
    };
  } catch (error) {
    const err = new Error(`Failed to load notes collection: ${error.message}`);
    err.success = false;
    err.code = 500;
    throw err;
  }
};
