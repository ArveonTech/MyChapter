import express from "express";

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { loadNotes, loadNote, addNote } from "../controllers/controllers.js";

const noteRoute = express.Router();

noteRoute.get("/notes", verifyUser, async (req, res) => {});

noteRoute.get("/notes/:id", verifyUser, async (req, res) => {});

noteRoute.post("/notes/add", verifyUser, async (req, res) => {});

noteRoute.put("/notes/:id", verifyUser, (req, res) => {});

noteRoute.patch("/notes/:id", verifyUser, (req, res) => {});

noteRoute.delete("/notes/:id", verifyUser, (req, res) => {});

export default noteRoute;
