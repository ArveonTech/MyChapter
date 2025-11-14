import { Navigate } from "react-router-dom";
import UseAuthGuard from "@/hooks/UseAuthGuard";

const GuestRoute = ({ children }) => {
  const auth = UseAuthGuard();

  if (auth === "loading") return null;

  // Kalau user udah login → lempar ke /home
  if (auth === "valid") return <Navigate to="/home" replace />;

  return children;
};

export default GuestRoute;
