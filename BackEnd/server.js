import express from "express";
import cookieParser from "cookie-parser";

// utils / middleware
import { createAccessToken, createRefreshToken } from "./utils/authToken.js";
import { validateUserMiddleware } from "./middleware/validateUserMiddleware.js";
import { findUser, addUser, loadUser } from "./controllers/usersControllers.js";
import { verifyUser } from "./middleware/authMiddleware.js";
import { addRandomTokenInDB } from "./helper/randomToken/addRandomTokenInDB.js";
import { changePasswordById } from "./utils/changePasswordById.js";
import { findUserByEmail } from "./helper/findUserByEmail.js";
import { validateForgotPassword } from "./utils/validateDataForgotPassword.js";

// routers
import adminRoute from "./routers/adminRoutes.js";
import userRoute from "./routers/userRoutes..js";
import noteRoute from "./routers/noteRoutes.js";
import { resetPassword } from "./utils/resetPassword.js";
import { removeRandomTokenInDB } from "./helper/randomToken/removeRandomTokenInDB.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);

// auth
app.get("/auth/validate", verifyUser, async (req, res) => {
  res.setHeader("Refresh-Token", req.refreshToken);
  res.json({ payload: req.user, accessToken: req.accessToken });
});

app.post("/auth/signin", async (req, res) => {
  const user = req.body;
  const foundUser = await findUser(user.email, user.password);

  if (foundUser.code !== 200) return res.status(401).json(foundUser.message);

  const accessToken = createAccessToken(foundUser.data);
  const refreshToken = createRefreshToken(foundUser.data);

  res.setHeader("Refresh-token", refreshToken);
  res.json({ message: foundUser.message, accessToken });
});

app.post("/auth/signup", validateUserMiddleware, async (req, res) => {
  const user = req.body;
  const userNew = await addUser(user);

  if (userNew.code !== 200) return res.status(401).json(userNew.message);

  const accessToken = createAccessToken(userNew.data);
  const refreshToken = createRefreshToken(userNew.data);

  res.setHeader("Refresh-token", refreshToken);
  res.json({ message: userNew.message, userNew, accessToken });
});

app.get("/auth/signout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/auth/signin");
});

app.get("/auth/generate-reset-token", async (req, res) => {
  let dataUser = null;

  if (req.body._id) {
    const paramsUser = req.body._id;
    dataUser = await loadUser(paramsUser);
  } else if (req.body.email) {
    const paramsUser = req.body.email;
    dataUser = await findUserByEmail(paramsUser);
  } else {
    res.status(401).json("user identifier required");
  }

  if (dataUser.code !== 200) return { success: dataUser.success, code: dataUser.code, message: dataUser.message };

  const addRandomToken = await addRandomTokenInDB(dataUser);

  if (addRandomToken.code !== 200) return res.status(addRandomToken.code).json(addRandomToken.message);

  res.status(addRandomToken.code).json(addRandomToken);
});

app.post("/auth/change-password", verifyUser, async (req, res) => {
  const { idUser, oldPassword, newPassword, randomToken, tokenSendingTime } = req.body;

  const dataChangePassword = await changePasswordById(idUser, oldPassword, newPassword, randomToken, tokenSendingTime);

  if (dataChangePassword.code !== 200) return res.status(dataChangePassword.code).json(dataChangePassword.message);

  res.status(dataChangePassword.code).json(dataChangePassword);
});

app.post("/auth/verify-account", async (req, res) => {
  const { email, randomToken, tokenSendingTime } = req.body;

  const dataValidateAccount = await validateForgotPassword(email, randomToken, tokenSendingTime);

  if (dataValidateAccount.code !== 200) return res.status(dataValidateAccount.code).json(dataValidateAccount.message);

  const removeRandomToken = await removeRandomTokenInDB(req.body);

  if (removeRandomToken.code !== 200) return res.status(removeRandomToken.code).json(removeRandomToken.message);

  res.status(dataValidateAccount.code).json(dataValidateAccount);
});

app.post("/auth/reset-password", async (req, res) => {
  const { idUser, newPassword } = req.body;

  const dataResetPassword = await resetPassword(idUser, newPassword);

  if (dataResetPassword.code !== 200) return { success: dataResetPassword.success, code: dataResetPassword.code, message: dataResetPassword.message };

  const accessToken = createAccessToken(userNew.data);
  const refreshToken = createRefreshToken(userNew.data);

  const removeRandomToken = await removeRandomTokenInDB(req.body);

  if (removeRandomToken.code !== 200) return res.status(removeRandomToken.code).json(removeRandomToken.message);

  res.setHeader("Refresh-token", refreshToken);
  res.json({ message: dataResetPassword.message, userNew, accessToken });
});

app.listen(3000, () => {
  console.info(`listen to port 3000`);
});
