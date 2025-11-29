const isTokenCheck = (accessToken) => {
  try {
    const payloadBase64 = accessToken.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    const nowSec = Math.floor(Date.now() / 1000);
    return nowSec <= payload.exp;
  } catch (err) {
    return false;
  }
};

export default isTokenCheck;
