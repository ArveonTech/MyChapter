import { loadAllUsers } from "../controllers/controllers.js";

export const validateUser = async ({ name, email, password }) => {
  try {
    const allUsers = await loadAllUsers();

    const foundUserByEmail = allUsers.data.find((user) => user.email === email);

    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    if (!/^[A-Za-z ]+$/.test(name)) return "Name can only contain letters and spaces";

    if (foundUserByEmail) return "email is already";
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";

    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/[A-Za-z]/.test(password)) return "Password must contain at least one letter";
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: `Gagal validasi user ${error.message}`,
    };
  }
};
