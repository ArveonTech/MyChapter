import express from "express";

const app = express();
app.use(express.json());

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { addNote, deleteNote, loadNote, loadNotes, updateNote } from "../controllers/notesControllers.js";

const noteRoute = express.Router();

noteRoute.get("/notes", verifyUser, async (req, res) => {
  try {
    const notes = await loadNotes(req.user._id);
    if (notes.success === false) return res.status(notes.code).json(notes.message);
    res.status(notes.code).json(notes);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while retrieving the note list: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

noteRoute.get("/notes/:id", verifyUser, async (req, res) => {
  try {
    const note = await loadNote(req.params.id);
    if (!note.success) return res.status(note.code).json(note.message);
    res.status(200).json(note);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while taking notes ${error.message}`,
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
      message: `An error occurred while adding a note: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

noteRoute.patch("/notes/update", verifyUser, async (req, res) => {
  try {
    const idUser = req.user._id;
    const userIdNotes = req.body.userId;
    const dataNote = req.body;

    const foundNote = await loadNote(req.body._id);

    if (foundNote.code !== 200) return res.status(foundNote.code).json({ message: foundNote.message });

    if (idUser !== userIdNotes) return res.status(403).json({ message: "You don't have access!" });

    const resultUpdateNote = await updateNote(req.body._id, dataNote);

    res.status(resultUpdateNote.code).json({ message: resultUpdateNote.message });
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while updating the note: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

noteRoute.delete("/notes/:delete", verifyUser, async (req, res) => {
  try {
    const dataUser = req.user;
    const dataNoteDelete = req.body;

    const foundNote = await loadNote(dataNoteDelete._id);

    if (foundNote.code !== 200) return res.status(foundNote.code).json({ message: foundNote.message });
    if (dataUser._id !== dataNoteDelete.userId && dataUser.role !== "admin" && dataUser.role !== "super admin") return res.status(403).json({ message: "You don't have access!" });

    const resultUpdateNote = await deleteNote(dataNoteDelete._id);

    res.status(resultUpdateNote.code).json({ message: resultUpdateNote.message });
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while deleting the note: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

export default noteRoute;
