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
import NotesPage from "./components/pages/NotesPage";
import ArchivePage from "./components/pages/ArchivePage";
import FormPage from "./components/pages/FormPage";
import DetailPage from "./components/pages/DetailPage";

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
    path: "/notes",
    element: (
      <ProtectedRoute>
        <NotesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/archive",
    element: (
      <ProtectedRoute>
        <ArchivePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/detail/:slug",
    element: (
      <ProtectedRoute>
        <DetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add",
    element: (
      <ProtectedRoute>
        <FormPage mode="add" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <ProtectedRoute>
        <FormPage mode="edit" />
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
