export function validateUser({ name, email, password }) {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (!/^[A-Za-z ]+$/.test(name)) return "Name can only contain letters and spaces";

  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";

  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  if (!/[A-Za-z]/.test(password)) return "Password must contain at least one letter";
}
