import express from "express";

// utils
import { verifyAdmin } from "../middleware/authMiddleware.js";
import { loadAllUsers, loadAllNotes } from "../controllers/controllers.js";
import { deleteUser, loadUser, updateUserRole } from "../controllers/usersControllers.js";
import { loadNotes, loadNote } from "../controllers/notesControllers.js";
import { deleteNote } from "../controllers/notesControllers.js";

// config
const adminRoute = express.Router();

adminRoute.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await loadAllUsers();

    if (!users.success) return res.status(users.code).json({ message: users.message });

    res.json(users);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal mengambil data users`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

adminRoute.get("/users/:userId/notes", verifyAdmin, async (req, res) => {
  try {
    const notes = await loadNotes(req.params.userId);
    if (!notes.success) return res.status(notes.code).json({ message: notes.message });
    res.json(notes);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal mengambil notes user ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

adminRoute.get("/users/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await loadUser(req.params.id);
    if (!user.success) return res.status(user.code).json({ message: user.message });
    res.json(user);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal menampilkan user ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

adminRoute.patch("/users/:id/role", verifyAdmin, async (req, res) => {
  try {
    const updateRole = await updateUserRole(req.user, req.params.id, req.body);
    res.json(updateRole);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal mengubah role user ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

adminRoute.delete("/users/:id", verifyAdmin, async (req, res) => {
  try {
    const dataDelete = await deleteUser(req.params.id, req.user);

    if (!dataDelete.success) return res.status(dataDelete.code).json({ message: dataDelete.message });

    res.json(dataDelete);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal menghapus user ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

adminRoute.get("/notes", verifyAdmin, async (req, res) => {
  try {
    const notes = await loadAllNotes();
    if (!notes.success) return res.status(notes.code).json({ message: notes.message });
    res.json(notes);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal mengambil semua notes ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

adminRoute.get("/notes/:id", verifyAdmin, async (req, res) => {
  try {
    const note = await loadNote(req.params.id);
    if (!note.success) return res.status(note.code).json({ message: note.message });
    res.json(note);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal menampilkan daftar notes user ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

adminRoute.delete("/notes/delete", verifyAdmin, async (req, res) => {
  try {
    const dataUser = req.user;
    const dataNoteUser = req.body;
    const idDeleteNote = req.params.id;

    const foundNote = await loadNote(req.params.id);

    if (foundNote.code !== 200) return res.status(foundNote.code).json({ message: foundNote.message });
    if (dataUser.userId !== dataNoteUser._id && dataUser.role !== "admin" && dataUser.role !== "super admin") return res.status(403).json({ message: "anda tidak memliki akses" });

    const resultUpdateNote = await deleteNote(idDeleteNote);

    res.status(resultUpdateNote.code).json({ message: resultUpdateNote.message });
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal menghapus note ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

export default adminRoute;
