import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import LandingPage from "./components/pages/LandingPage";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import HomePage from "./components/pages/HomePage";
import NotFoundPage from "./components/pages/NotFoundPage";

// guards
import ProtectedRoute from "@/utils/ProtectedRoute";
import GuestRoute from "@/utils/GuestRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestRoute>
        <LandingPage />
      </GuestRoute>
    ),
  },
  {
    path: "/auth/signin",
    element: (
      <GuestRoute>
        <SigninPage />
      </GuestRoute>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <GuestRoute>
        <SignupPage />
      </GuestRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
