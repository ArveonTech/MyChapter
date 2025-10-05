import express from "express";
import cookieParser from "cookie-parser";
import { createAccessToken, createRefreshToken } from "./utils/authToken.js";
import { verifyAdmin, verifyUser } from "./middleware/authMiddleware.js";
import { validateUserMiddleware } from "./middleware/validateUserMiddleware.js";
import { loadUsers, loadUser } from "./controllers/controllers.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signin", (req, res) => {
  const user = req.body;
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  res.setHeader("Access-token", accessToken);
  res.json({ message: "Data diterima", refreshToken });
});

app.post("/signup", validateUserMiddleware, (req, res) => {});

// user
app.get("/api/user/:id", verifyUser, async (req, res) => {
  const user = await loadUser(req.params.id);
  res.json(user);
});

app.delete("/api/user/:id", verifyUser, (req, res) => {});

// notes
app.get("/api/notes", verifyUser, async (req, res) => {
  const notes = await loadnotes();
  res.json(notes);
});

app.get("/api/note/:id", verifyUser, async (req, res) => {
  const note = await loadNote(req.params.id);
  res.json(note);
});

app.put("/api/note/:id", verifyUser, (req, res) => {});

app.path("/api/note/:id", verifyUser, (req, res) => {});

app.delete("/api/note/:id", verifyUser, (req, res) => {});

// admin
app.get("/api/admin/users", verifyAdmin, async (req, res) => {
  const users = await loadUsers();
  res.json(users);
});

app.get("/api/admin/user/:id", verifyAdmin, async (req, res) => {
  const user = await loadUser(req.params.id);
  console.info(user);
  res.json(user);
});

app.get("/api/admin/notes", verifyAdmin, async (req, res) => {
  const notes = await loadnotes();
  res.json(notes);
});

app.get("/api/admin/note/:id", verifyAdmin, async (req, res) => {
  const note = await loadNote(req.params.id);
  res.json(note);
});

app.listen(3000, () => {
  console.info(`listen to port 3000`);
});
