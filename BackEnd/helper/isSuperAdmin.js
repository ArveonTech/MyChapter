import { loadUser } from "../controllers/usersControllers.js";

export const isSuperAdmin = async (admin) => {
  const user = await loadUser(admin._id);
  return user.role === "super admin";
};
