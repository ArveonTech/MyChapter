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
import UseAuthGuard from "@/hooks/UseAuthGuard";

// utils
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const authGuard = UseAuthGuard();

  useEffect(() => {
    if (authGuard === "valid") {
      navigate("/home");
    }
  }, [authGuard]);

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
