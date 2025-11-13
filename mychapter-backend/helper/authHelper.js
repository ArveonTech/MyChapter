import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// utils
import { createAccessToken } from "../utils/authToken.js";

// config
dotenv.config({ path: "./env/.env" });

const accessKey = process.env.ACCESS_SECRET_KEY;
const refreshKey = process.env.REFRESH_SECRET_KEY;

export const authenticateToken = (tokenAccess, tokenRefresh) => {
  try {
    const decodeAccess = jwt.verify(tokenAccess, accessKey);
    return { success: true, code: 200, status: "ok", refreshToken: tokenRefresh, accessToken: tokenAccess, payload: decodeAccess };
  } catch (err) {
    try {
      const decodeRefresh = jwt.verify(tokenRefresh, refreshKey);
      const { password, exp, iat, ...rest } = decodeRefresh;
      return { success: true, code: 200, status: "refresh", refreshToken: tokenRefresh, accessToken: createAccessToken(rest) };
    } catch (err2) {
      return { success: false, code: 500, error: err2 };
    }
  }
};
