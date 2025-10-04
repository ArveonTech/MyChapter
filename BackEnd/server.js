import express from "express";
import cookieParser from "cookie-parser";
import { createAccessToken, createRefreshToken } from "./utils/authToken.js";
import { verifyUser } from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
  const user = req.body;
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  res.setHeader("Access-token", accessToken);
  res.json({ message: "Data diterima", refreshToken });
});

app.get("/dasboard", verifyUser, (req, res) => {
  res.json(req.user);
});

app.listen(3000, () => {
  console.info(`listen to port 3000`);
});
