// components
import IncomingUserNotification from "../common/Home/incomingUserNotification";

import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  return (
    <div>
      <IncomingUserNotification />
      <div></div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
