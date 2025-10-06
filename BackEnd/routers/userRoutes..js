import express from "express";

// utils
import { verifyUser } from "../middleware/authMiddleware.js";
import { loadUser } from "../controllers/controllers.js";

const userRoute = express.Router();

userRoute.get("/:id", verifyUser, async (req, res) => {
  const user = await loadUser(req.params.id);
  res.json(user);
});

userRoute.delete("/:id", verifyUser, async (req, res) => {
  const dataDelete = await deleteUser(req.params);
  res.json(dataDelete);
});

export default userRoute;
