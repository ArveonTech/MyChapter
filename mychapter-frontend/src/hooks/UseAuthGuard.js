import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isTokenCheck from "../utils/isTokenCheck";
import generateAccessToken from "../utils/genereteAccessToken";

const UseAuthGuard = () => {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("access-token");

      if (!accessToken) {
        try {
          const result = await generateAccessToken();
          localStorage.setItem("access-token", result.accessToken);
          setStatus("refreshed");
        } catch (error) {
          setStatus("failed");
          navigate("/auth/signin");
        }
        return;
      }

      if (!isTokenCheck(accessToken)) {
        try {
          const result = await generateAccessToken(accessToken);
          localStorage.setItem("access-token", result.accessToken);
          setStatus("refreshed");
        } catch (error) {
          setStatus("failed");
          navigate("/auth/signin");
        }
        return;
      }

      setStatus("valid");
    };

    checkAuth();
  }, []);

  return status;
};

export default UseAuthGuard;
