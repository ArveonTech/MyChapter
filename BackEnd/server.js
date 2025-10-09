import express from "express";
import cookieParser from "cookie-parser";

// utils / middleware
import { createAccessToken, createRefreshToken } from "./utils/authToken.js";
import { validateUserMiddleware } from "./middleware/validateUserMiddleware.js";

// routers
import adminRoute from "./routers/adminRoutes.js";
import userRoute from "./routers/userRoutes..js";
import noteRoute from "./routers/noteRoutes.js";
import { findUser, addUser } from "./controllers/usersControllers.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);

// auth
app.post("/auth/signin", async (req, res) => {
  const user = req.body;

  const foundUser = await findUser(user.email, user.password);

  if (foundUser.code !== 200) return res.status(401).json(foundUser.message);

  const accessToken = createAccessToken(foundUser.data);
  const refreshToken = createRefreshToken(foundUser.data);

  res.setHeader("Refresh-token", refreshToken);
  res.json({ message: "Data user diterima", accessToken });
});

app.post("/auth/signup", validateUserMiddleware, async (req, res) => {
  const userNew = await addUser(req.body);

  const accessToken = createAccessToken(userNew.data);
  const refreshToken = createRefreshToken(userNew.data);

  res.setHeader("Refresh-token", refreshToken);
  res.json({ message: "User berhasil ditambahkan", userNew, accessToken });
});

app.get("/auth/signout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/auth/signin");
});

app.listen(3000, () => {
  console.info(`listen to port 3000`);
});
