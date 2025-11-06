import { requestBE } from "../libs/requestBE-lib";

const generateAccessToken = async (accessToken = null) => {
  try {
    const response = await requestBE("GET", "auth/validate", null, "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) return response.data;

    throw new Error("Access token invalid");
  } catch (err) {
    throw err;
  }
};

export default generateAccessToken;
