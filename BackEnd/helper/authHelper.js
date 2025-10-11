import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// utils
import { createAccessToken } from "../utils/authToken.js";

// config
dotenv.config({ path: "./env/.env" });

// ambil secret key dari .env
const accessKey = process.env.ACCESS_SECRET_KEY;
const refreshKey = process.env.REFRESH_SECRET_KEY;

// fungsi validasi token
export const authenticateToken = (tokenAccess, tokenRefresh) => {
  try {
    const decodeAccess = jwt.verify(tokenAccess, accessKey);
    return { success: true, code: 200, status: "ok", refreshToken: tokenRefresh, accessToken: tokenAccess, payload: decodeAccess };
  } catch (err) {
    try {
      const decodeRefresh = jwt.verify(tokenRefresh, refreshKey);
      const userData = { name: decodeRefresh.name, email: decodeRefresh.email };
      return { success: true, code: 200, status: "refresh", refreshToken: tokenRefresh, accessToken: createAccessToken(userData) };
    } catch (err2) {
      return { success: false, code: 500, error: err2 };
    }
  }
};
