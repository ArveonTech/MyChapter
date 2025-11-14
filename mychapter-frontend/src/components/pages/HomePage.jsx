// components
import HeaderComponent from "../common/Home/HeaderComponent";
import IncomingUserNotificationComponent from "../common/Home/IncomingUserNotificationComponent";

import { ToastContainer, toast } from "react-toastify";
import SearchButtonComponent from "../common/Home/SearchButton";

const HomePage = () => {
  return (
    <div>
      <IncomingUserNotificationComponent />
      <HeaderComponent />
      <SearchButtonComponent />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
