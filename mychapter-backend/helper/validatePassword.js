const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  if (!/[A-Za-z]/.test(password)) return "Password must contain at least one letter";
};

export default validatePassword;
