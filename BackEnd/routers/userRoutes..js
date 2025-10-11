import express from "express";

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { loadUser, deleteUser } from "../controllers/usersControllers.js";

const userRoute = express.Router();

userRoute.get("/:id", verifyUser, async (req, res) => {
  try {
    const user = await loadUser(req.params.id);

    if (req.user._id !== req.params.id) return res.status(401).json({ message: "You don't have access!" });

    res.status(user.code).json(user);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `An error occurred while retrieving the user: ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

userRoute.delete("/:id", verifyUser, async (req, res) => {
  try {
    const dataDelete = await deleteUser(req.params.id, req.user);

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
