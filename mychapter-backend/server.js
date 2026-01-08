import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

dotenv.config({ path: "./env/.env" });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mychapter.netlify.app", "https://mychapter-production.up.railway.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();
  limiter(req, res, next);
});

import userRoute from "./routers/userRoutes.js";
import noteRoute from "./routers/noteRoutes.js";
import { verifyUser } from "./middleware/authMiddleware.js";
import { findUser, addUser, loadUser } from "./controllers/usersControllers.js";
import { createAccessToken, createRefreshToken } from "./utils/authToken.js";
import { validateUserMiddleware } from "./middleware/validateUserMiddleware.js";
import validatePassword from "./helper/validatePassword.js";
import { changePasswordById } from "./utils/changePasswordById.js";

app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "server is running" });
});

app.get(
  "/auth/validate",
  (req, res, next) => {
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
  },
  verifyUser,
  (req, res) => {
    res.json({ accessToken: req.accessToken });
  }
);

app.post("/auth/signin", async (req, res) => {
  const user = req.body;
  const foundUser = await findUser(user.email, user.password);

  if (foundUser.code < 200 || foundUser.code >= 300) {
    return res.status(401).json(foundUser.message);
  }

  const { password, ...rest } = foundUser.data;

  const accessToken = createAccessToken(rest);
  const refreshToken = createRefreshToken(rest);

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 168,
  });

  res.status(200).json({ username: rest.username, accessToken });
});

app.post("/auth/signup", validateUserMiddleware, async (req, res) => {
  const userNew = await addUser(req.body);

  if (userNew.code < 200 || userNew.code >= 300) {
    return res.status(401).json(userNew.message);
  }

  const { password, ...rest } = userNew.data;

  const accessToken = createAccessToken(rest);
  const refreshToken = createRefreshToken(rest);

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 168,
  });

  res.status(201).json({ username: rest.username, accessToken });
});

app.get("/auth/signout", (req, res) => {
  res.clearCookie("refresh-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.json({ message: "Signed out" });
});

app.post("/auth/change-password", verifyUser, async (req, res) => {
  const { idUser, newPassword } = req.body;
  const user = await loadUser(req.user._id);

  if (idUser !== req.user._id) return res.status(401).json({ error: "No access" });

  if (user.data.password === newPassword) return res.status(400).json({ error: "Same password" });

  const validate = validatePassword(newPassword);
  if (validate) return res.status(400).json({ error: validate });

  const result = await changePasswordById(idUser, newPassword);
  if (result.code >= 300) return res.status(result.code).json(result.message);

  const { password, ...rest } = user.data;
  const accessToken = createAccessToken(rest);
  const refreshToken = createRefreshToken(rest);

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 168,
  });

  res.json({ accessToken });
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.info(`🚀 listen on ${port}`));
