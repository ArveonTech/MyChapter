// components
import HeaderComponent from "@/components/common/Home/HeaderComponent";
import IncomingUserNotificationComponent from "@/components/common/Home/IncomingUserNotificationComponent";
import HeroComponent from "@/components/common/Home/HeroComponent";
import FilterNoteComponent from "@/components/common/Home/FilterNoteComponent";
import NotesCardComponent from "@/components/common/Home/NotesCardComponent";

const HomePage = () => {
  return (
    <div className="mb-10">
      <IncomingUserNotificationComponent />
      <HeaderComponent />
      <HeroComponent />
      <FilterNoteComponent />
      <NotesCardComponent />
    </div>
  );
};

export default HomePage;
