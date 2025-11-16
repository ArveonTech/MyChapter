import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

// utils / middleware
import { createAccessToken, createRefreshToken } from "./utils/authToken.js";
import { validateUserMiddleware } from "./middleware/validateUserMiddleware.js";
import { findUser, addUser } from "./controllers/usersControllers.js";
import { verifyUser } from "./middleware/authMiddleware.js";
import { changePasswordById } from "./utils/changePasswordById.js";

// routers
import adminRoute from "./routers/adminRoutes.js";
import userRoute from "./routers/userRoutes.js";
import noteRoute from "./routers/noteRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: `http://localhost:5173`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

dotenv.config({ path: "./env/.env" });

app.use("/api/admin", adminRoute);
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
  res.json({ message: "Signed out" });
});

app.post("/auth/change-password", verifyUser, async (req, res) => {
  const { idUser, newPassword } = req.body;

  const dataChangePassword = await changePasswordById(idUser, newPassword);

  if (dataChangePassword.code < 200 || dataChangePassword.code >= 300) {
    res.status(dataChangePassword.code).json(dataChangePassword.message);
  }

  res.status(dataChangePassword.code).json(dataChangePassword);
});

app.listen(PORT, () => {
  console.info(`listen to port 3000`);
});
