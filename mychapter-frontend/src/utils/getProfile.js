const getProfile = () => {
  const accessToken = localStorage.getItem("access-token");

  const payloadBase64 = accessToken.split(".")[1];
  const payload = JSON.parse(atob(payloadBase64));

  return payload;
};

export default getProfile;
