import express from "express";

const app = express();
app.use(express.json());

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { addNote, deleteNote, getLimitNotes, loadNote, loadNotes, updateNote } from "../controllers/notesControllers.js";

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

noteRoute.get("/records", verifyUser, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // page
    const limit = parseInt(req.query.limit) || 10; // limit
    const searchQuery = req.query.searchQuery || ""; // search
    const tag = req.query.tag || ""; // tag(work&hobby,life,dl)
    const status = req.query.status || ""; // status(arhice,pinned,favorite)
    const sortBy = req.query.sortBy || "latest"; // sorting by time
    const filterBy = req.query.filterBy || "updateAt"; // sorting by create or update
    const incArchive = req.query.incArchive || false;
    const userId = req.user._id;

    const startIndexPage = (page - 1) * limit;
    let limitPage = 0;

    if (isNaN(limit) || limit > 10 || limit < 1) {
      limitPage = 10;
    } else {
      limitPage = limit;
    }

    const filter = {};

    if (searchQuery) {
      filter.title = new RegExp(searchQuery, "i");
    }

    if (tag) {
      filter.tag = new RegExp(tag, "i");
    }

    if (status) {
      filter.status = new RegExp(status, "i");
    }

    if (incArchive) {
      filter.incArchive = true;
    } else {
      filter.incArchive = false;
    }

    const sort = {};

    if (filterBy === "createdAt") {
      if (sortBy === "oldest") {
        sort.createAt = 1;
      } else {
        sort.createAt = -1;
      }
    }
    if (filterBy === "updatedAt") {
      if (sortBy === "oldest") {
        sort.updateAt = 1;
      } else {
        sort.updateAt = -1;
      }
    }

    filter.userId = userId;

    const dataGetLimitNotes = await getLimitNotes(startIndexPage, limitPage, filter, sort, page);

    if (dataGetLimitNotes.code !== 200) return res.status(dataGetLimitNotes.code).json(dataGetLimitNotes.message);

    res.status(dataGetLimitNotes.code).json(dataGetLimitNotes);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while searching for notes: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

noteRoute.get("/notes/:id", verifyUser, async (req, res) => {
  try {
    const note = await loadNote(req.params.id);
    if (!note.success) return res.status(note.code).json(note.message);
    res.status(note.code).json(note);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while taking notes: ${error.message}`,
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
