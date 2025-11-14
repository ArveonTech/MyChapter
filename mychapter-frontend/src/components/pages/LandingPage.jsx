// import utils
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  once: true,
});

// components
import NavigationComponent from "@/components/common/Landing/NavigationComponent";
import HeroComponent from "@/components/common/Landing/HeroComponent";
import AboutComponent from "@/components/common/Landing/AboutComponent";
import FeaturesComponent from "../common/Landing/FeaturesComponent";
import ContactComponent from "../common/Landing/ContactComponent";

const LandingPage = () => {
  return (
    <div className="mb-20">
      <NavigationComponent />
      <HeroComponent />
      <AboutComponent />
      <FeaturesComponent />
      <ContactComponent />
    </div>
  );
};

export default LandingPage;
