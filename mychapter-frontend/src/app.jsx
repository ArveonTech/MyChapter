import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import HomePage from "./components/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/auth/signin",
    element: <SigninPage />,
  },
  {
    path: "/auth/signup",
    element: <SignupPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
