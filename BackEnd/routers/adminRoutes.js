import express from "express";

// utils
import { verifyAdmin } from "../middleware/authMiddleware.js";
import { loadAllUsers, loadAllNotes } from "../controllers/controllers.js";
import { deleteUser, loadUser, updateUserRole } from "../controllers/usersControllers.js";
import { loadNotes, loadNote } from "../controllers/notesControllers.js";

// config
const adminRoute = express.Router();

adminRoute.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await loadAllUsers();
    if (users.message) return res.status(200).json({ message: users.message });
    res.json(users);
  } catch (error) {
    console.info(`Gagal menampilkan daftar user : ${error.message}`);
  }
});

adminRoute.get("/users/:userId/notes", verifyAdmin, async (req, res) => {
  try {
    const notes = await loadNotes(req.params.userId);
    if (notes.message) return res.status(200).json({ message: notes.message });
    res.json(notes);
  } catch (error) {
    console.info(`Gagal menampilkan notes user : ${error.message}`);
  }
});

adminRoute.get("/users/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await loadUser(req.params.id);
    if (user.message) return res.status(200).json({ message: user.message });
    res.json(user);
  } catch (error) {
    console.info(`Gagal menampilkan user : ${error.message}`);
  }
});

adminRoute.patch("/users/:id/role", verifyAdmin, async (req, res) => {
  try {
    const updateRole = await updateUserRole(req.user, req.params.id, req.body);
    res.json(updateRole);
  } catch (error) {
    console.info(`Gagal mengubah role user : ${error.message}`);
  }
});

adminRoute.delete("/users/:id", verifyAdmin, async (req, res) => {
  const dataDelete = await deleteUser(req.params.id);
  res.json(dataDelete);
});

adminRoute.get("/notes", verifyAdmin, async (req, res) => {
  try {
    const notes = await loadAllNotes();
    if (notes.message) return res.status(200).json({ message: notes.message });
    res.json(notes);
  } catch (error) {
    console.info(`Gagal menampilkan daftar notes : ${error.message}`);
  }
});

adminRoute.get("/notes/:id", verifyAdmin, async (req, res) => {
  try {
    const note = await loadNote(req.params.id);
    if (note.message) return res.status(200).json({ message: note.message });
    res.json(note);
  } catch (error) {
    console.info(`Gagal menampilkan daftar notes user ${error.message}`);
  }
});

export default adminRoute;
