import { loadUser } from "../controllers/usersControllers.js";

export const isSuperAdmin = async (data) => {
  const user = await loadUser(data._id);
  return user.data.role === "super admin";
};
