import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createAccessToken } from "../utils/authToken.js";

dotenv.config({ path: "./env/.env" });

// ambil secret key dari .env
const accessKey = process.env.ACCESS_SECRET_KEY;
const refreshKey = process.env.REFRESH_SECRET_KEY;

// fungsi validasi token
export const authenticateToken = (tokenAccess, tokenRefresh) => {
  try {
    const decodeAccess = jwt.verify(tokenAccess, accessKey);
    return { status: "ok", payload: decodeAccess };
  } catch (err) {
    try {
      const decodeRefresh = jwt.verify(tokenRefresh, refreshKey);
      const userData = { nama: decodeRefresh.nama, email: decodeRefresh.email };
      return { status: "refresh", token: createAccessToken(userData) };
    } catch (err2) {
      return "403";
    }
  }
};
