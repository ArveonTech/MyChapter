import { useEffect, useState } from "react";
import { requestBE } from "../../lib/requestBE-lib";

const UseGetProfile = ({ valueRender }) => {
  const [dataProfile, setDataProfile] = useState(null);
  const [errorDataProfile, setErrorDataProfile] = useState(false);

  useEffect(() => {
    const fetchDataProfile = async () => {
      const accessToken = localStorage.getItem("access-token");

      try {
        const response = await requestBE("GET", "api/user/me", null, "", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        setDataProfile(response.data);
      } catch (err) {
        setErrorDataProfile(err);
      }
    };

    fetchDataProfile();
  }, [valueRender]);

  return { dataProfile, errorDataProfile };
};

export default UseGetProfile;
