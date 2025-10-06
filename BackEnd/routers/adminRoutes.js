import express from "express";

// utils
import { verifyAdmin } from "../middleware/authMiddleware.js";
import { loadUsers, loadUser, loadAllNotes, loadNote, loadNotes, updateUserRole } from "../controllers/controllers.js";

const adminRoute = express.Router();

adminRoute.get("/users", verifyAdmin, async (req, res) => {
  const users = await loadUsers();

  if (users.message) return res.status(200).json({ message: users.message });

  res.json(users);
});

adminRoute.get("/users/:id", verifyAdmin, async (req, res) => {
  const user = await loadUser(req.params.id);

  if (user.message) return res.status(200).json({ message: user.message });

  res.json(user);
});

adminRoute.patch("/users/:id/role", verifyAdmin, async (req, res) => {
  const updateRole = updateUserRole(req.params.id, req.body);

  res.json(updateRole);
});

adminRoute.get("/users/:userId/notes", verifyAdmin, async (req, res) => {
  const notes = await loadNotes(req.params.userId);

  if (notes.message) return res.status(200).json({ message: notes.message });

  res.json(notes);
});

adminRoute.get("/notes", verifyAdmin, async (req, res) => {
  const notes = await loadAllNotes();

  if (notes.message) return res.status(200).json({ message: notes.message });

  res.json(notes);
});

adminRoute.get("/notes/:id", verifyAdmin, async (req, res) => {
  const note = await loadNote(req.params.id);

  if (note.message) return res.status(200).json({ message: note.message });

  res.json(note);
});

export default adminRoute;
