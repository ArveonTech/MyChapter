import { useLocation } from "react-router-dom";
import UseAuthGuard from "../../hooks/UseAuthGuard";
import LoadingPage from "./LoadingPage";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useEffect } from "react";

const HomePage = () => {
  const verifyToken = UseAuthGuard();
  const location = useLocation();

  const notify = (status, m) => {
    toast[status](m, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  useEffect(() => {
    if (location.state && location.state?.status === "login") {
      notify("success", `Welcome ${location.state?.username}`);
    }
  }, [location.state]);

  return (
    <>
      {verifyToken === "loading" ? (
        <LoadingPage />
      ) : (
        <div>
          <h1>Ini halaman home</h1>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="light" transition={Bounce} />{" "}
    </>
  );
};

export default HomePage;
