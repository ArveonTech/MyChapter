import express from "express";

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { loadUser, deleteUser } from "../controllers/usersControllers.js";

const userRoute = express.Router();

userRoute.get("/:id", verifyUser, async (req, res) => {
  try {
    const user = await loadUser(req.params.id);

    if (req.user._id !== req.params.id) return res.status(401).json({ message: "Anda tidak memiliki akses" });

    res.json(user);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal mendapatkan user ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

userRoute.delete("/:id", verifyUser, async (req, res) => {
  try {
    
    const dataDelete = await deleteUser(req.params.id, req.body);
    if (req.user._id !== req.params.id) return res.status(401).json({ message: "Anda tidak memiliki akses" });

    res.status(200).json(dataDelete);
  } catch (error) {
    const errorObject = {
      success: false,
      code: 500,
      message: `Gagal menghapus user ${error.message}`,
    };
    res.status(errorObject.code).json({ message: errorObject.message });
  }
});

export default userRoute;
