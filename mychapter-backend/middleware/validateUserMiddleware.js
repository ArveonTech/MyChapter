import { validateUser } from "../utils/validateUser.js";

export const validateUserMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body;
  const validate = await validateUser({ username, email, password });

  if (validate) return res.status(400).json({ error: validate });

  next();
};
