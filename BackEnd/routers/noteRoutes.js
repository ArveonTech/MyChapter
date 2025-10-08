import express from "express";

const app = express();
app.use(express.json());

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { addNote, loadNote, loadNotes } from "../controllers/notesControllers.js";

const noteRoute = express.Router();

noteRoute.get("/notes", verifyUser, async (req, res) => {
  try {
    const notes = await loadNotes(req.body._id);
    if (notes.success === false) return res.status(notes.code).json(notes.message);
    res.status(notes.code).json(notes);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal mengambil daftar note ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

noteRoute.get("/notes/:id", verifyUser, async (req, res) => {
  try {
    const note = await loadNote(req.params.id);
    if (note.message) return res.status(200).json(note.message);
    res.status(200).json(note);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal menampilkan note ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

noteRoute.post("/notes/add", verifyUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const noteNew = req.body;
    const resultAddNote = await addNote(userId, noteNew);

    res.status(resultAddNote.code).json({ message: resultAddNote.message });
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal menampilkan note ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

noteRoute.patch("/notes/:id", verifyUser, async (req, res) => {
  const idUser = req.user._id;
  const userIdNotes = req.body.userId;
  const dataNote = req.body;

  const foundNote = await loadNote(userIdNotes);

  if (foundNote.code !== 200) return res.status(foundNote.code).json({ message: foundNote.message });
  if (idUser !== userIdNotes) return res.status(403).json({ message: "anda tidak memliki akses" });
});

noteRoute.delete("/notes/:id", verifyUser, (req, res) => {});

export default noteRoute;
