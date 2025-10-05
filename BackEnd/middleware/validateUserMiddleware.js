import { validateUser } from "../utils/validateUser.js";

export const validateUserMiddleware = (req, res, next) => {
  const { name, email, password } = req.body;
  const validate = validateUser({ name, email, password });

  if (validate) return res.status(400).json({ error: validate });

  next();
};
