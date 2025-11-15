// components
import HeaderComponent from "@/components/common/Home/HeaderComponent";
import IncomingUserNotificationComponent from "@/components/common/Home/IncomingUserNotificationComponent";
import HeroComponent from "@/components/common/Home/HeroComponent";

const HomePage = () => {
  return (
    <div>
      <IncomingUserNotificationComponent />
      <HeaderComponent />
      <HeroComponent />
    </div>
  );
};

export default HomePage;
