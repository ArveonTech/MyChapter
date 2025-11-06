const isTokenCheck = (accessToken) => {
  if (!accessToken) return false;

  const payloadBase64 = accessToken.split(".")[1];
  const payload = JSON.parse(atob(payloadBase64));
  const nowSec = Math.floor(Date.now() / 1000);
  const expToken = payload.exp;

  return nowSec <= expToken;
};

export default isTokenCheck;
