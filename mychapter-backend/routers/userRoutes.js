import express from "express";

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { loadUser, deleteUser } from "../controllers/usersControllers.js";

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

userRoute.delete("/me", verifyUser, async (req, res) => {
  try {
    const dataDelete = await deleteUser(req.user._id, req.user);

    if (!dataDelete.success) return res.status(dataDelete.code).json({ message: dataDelete.message });

    res.status(dataDelete.code).json(dataDelete);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while retrieving the user: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

export default userRoute;
