import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninPages from "./components/pages/SigninPages";

const router = createBrowserRouter([
  {
    path: "/auth/signin",
    element: <SigninPages />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
