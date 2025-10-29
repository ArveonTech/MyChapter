import { authenticateToken } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";

// buat middleware dari request
export const verifyUser = (req, res, next) => {
  // ambil access token
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  // ambil refresh token
  const refreshToken = req.headers["refreshtoken"]?.split(" ")[1];

  if (!accessToken && !refreshToken) return res.status(403).json({ message: "No token provided" });

  const result = authenticateToken(accessToken, refreshToken);

  if (result.success === false) return res.status(401).json({ message: result.error });

  // kondisi jika dikirim token atau dikirim payload
  if (result.status === "refresh") {
    req.refreshToken = result.refreshToken;
    req.accessToken = result.accessToken;
    req.user = jwt.decode(result.accessToken);
  } else if (result.status === "ok") {
    req.user = result.payload;
  }

  next();
};

export const verifyAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user?.role !== "admin" && req.user?.role !== "super admin") return res.status(403).json({ message: "You don't have access" });
    next();
  });
};
