import { authenticateToken } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";

// buat middleware dari request
export const verifyUser = (req, res, next) => {
  // ambil access token
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  // ambil refresh token
  const refreshToken = req.headers["refreshtoken"]?.split(" ")[1];

  if (!accessToken && !refreshToken) return res.status(401).json({ message: "No token provided" });

  const result = authenticateToken(accessToken, refreshToken);

  // kondisi jika dikirim token atau dikirim payload
  if (result.status === "refresh") {
    res.setHeader("Access-token", result.token);
    req.user = jwt.decode(result.token);
  } else if (result.status === "ok") {
    req.user = result.payload;
  }

  next();
};

export const verifyAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });
    next();
  });
};
