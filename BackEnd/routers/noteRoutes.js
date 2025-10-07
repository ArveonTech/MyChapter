import express from "express";

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { loadNote, loadNotes } from "../controllers/notesControllers.js";

const noteRoute = express.Router();

noteRoute.get("/notes", verifyUser, async (req, res) => {
  const notes = await loadNotes(req.body._id);
  if (notes.success === false) return res.status(notes.code).json(notes.message);
  res.status(notes.code).json(notes);
});

noteRoute.get("/notes/:id", verifyUser, async (req, res) => {
  const note = await loadNote(req.params.id);
  if (note.message) return res.status(200).json(note.message);
  res.status(200).json(note);
});

noteRoute.post("/notes/add", verifyUser, async (req, res) => {});

noteRoute.put("/notes/:id", verifyUser, (req, res) => {});

noteRoute.patch("/notes/:id", verifyUser, (req, res) => {});

noteRoute.delete("/notes/:id", verifyUser, (req, res) => {});

export default noteRoute;
