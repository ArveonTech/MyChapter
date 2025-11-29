import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

// utils / middleware
import { createAccessToken, createRefreshToken } from "./utils/authToken.js";
import { validateUserMiddleware } from "./middleware/validateUserMiddleware.js";
import { findUser, addUser, loadUser } from "./controllers/usersControllers.js";
import { verifyUser } from "./middleware/authMiddleware.js";
import { changePasswordById } from "./utils/changePasswordById.js";

// routers
import userRoute from "./routers/userRoutes.js";
import noteRoute from "./routers/noteRoutes.js";
import validatePassword from "./helper/validatePassword.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mychapter-production.up.railway.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.options(/.*/, cors());

app.use(express.json());
app.use(cookieParser());
app.use(limiter);

dotenv.config({ path: "./env/.env" });

app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);

const PORT = process.env.PORT || 3000;

// auth
app.get("/auth/validate", verifyUser, async (req, res) => {
  res.json({ accessToken: req.accessToken });
});

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
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 168,
    path: "/",
  });

  res.status(200).json({ username: rest.username, accessToken });
});

app.post("/auth/signup", validateUserMiddleware, async (req, res) => {
  const user = req.body;
  const userNew = await addUser(user);

  if (userNew.code < 200 || userNew.code >= 300) {
    return res.status(401).json(userNew.message);
  }

  const { password, ...rest } = userNew.data;

  const accessToken = createAccessToken(rest);
  const refreshToken = createRefreshToken(rest);

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 168,
    path: "/",
  });
  res.status(201).json({ username: rest.username, accessToken });
});

app.get("/auth/signout", (req, res) => {
  res.clearCookie("refresh-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 168,
    path: "/",
  });
  res.status(200).json({ message: "Signed out" });
});

app.post("/auth/change-password", verifyUser, async (req, res) => {
  const idUserCookie = req.user._id;
  const { idUser, newPassword } = req.body;
  const user = await loadUser(req.user._id);
  const { password, ...rest } = user.data;

  if (idUser !== idUserCookie) return res.status(401).json({ error: "You don't have access" });

  if (password === newPassword) return res.status(400).json({ error: "Passwords cannot be the same" });

  const validate = validatePassword(newPassword);

  if (validate) return res.status(400).json({ error: validate });

  const result = await changePasswordById(idUser, newPassword);

  if (result.code < 200 || result.code >= 300) {
    return res.status(result.code).json(result.message);
  }

  if (user.code < 200 || user.code >= 300) {
    return res.status(user.code).json(user.message);
  }

  const accessToken = createAccessToken(rest);
  const refreshToken = createRefreshToken(rest);

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 168,
    path: "/",
  });

  res.status(result.code).json({ accessToken, result });
});

app.listen(PORT, () => {
  console.info(`listen to port 3000`);
});
