import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env" });

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { loadUser, changeProfile } from "../controllers/usersControllers.js";
import { createAccessToken, createRefreshToken } from "../utils/authToken.js";

const userRoute = express.Router();

userRoute.get("/me", verifyUser, async (req, res) => {
  try {
    const user = await loadUser(req.user._id);

    const { password, ...rest } = user.data;

    res.status(user.code).json(rest);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while retrieving the user: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

userRoute.post("/me/changeprofile", verifyUser, async (req, res) => {
  try {
    const idUser = req.user._id;
    const dataUser = req.body;
    const idUserNote = dataUser._id;

    const result = await changeProfile(idUser, dataUser, idUserNote);

    const user = await loadUser(req.user._id);
    const { password, ...rest } = user.data;

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
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while update the user: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

export default userRoute;
