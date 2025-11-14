import { Navigate } from "react-router-dom";
import UseAuthGuard from "@/hooks/UseAuthGuard";

const ProtectedRoute = ({ children }) => {
  const auth = UseAuthGuard();

  console.info(auth);
  if (auth === "loading") return null;

  if (auth !== "valid") return <Navigate to="/auth/signin" replace />;

  return children;
};

export default ProtectedRoute;
