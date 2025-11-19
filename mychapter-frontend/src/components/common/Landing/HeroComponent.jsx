// import utils
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

AOS.init({
  once: true,
});

// components
import { Button } from "@/components/ui/button";

const HeroComponent = () => {
  return (
    <section className="bg-secondary/40 relative flex flex-col md:flex-row items-center px-10 py-10 overflow-hidden" id="home">
      <div className="flex-1 text-center md:text-left space-y-5" data-aos="fade-right" data-aos-duration="1300">
        <h1 className="text-[clamp(3px,100vw,18px)] xs:text-3xl font-semibold text-primary">MyChapter</h1>
        <p className="text-sm sm:text-lg md:text-xl italic text-foreground">"A place where every thought has its own space. Write, save, and rediscover your inspiration whenever you want."🍃</p>
        <Button asChild>
          <Link to="/auth/signin">Try Now</Link>
        </Button>
      </div>

      <div className="flex justify-center mt-10 md:mt-0" data-aos="fade-left" data-aos-duration="1300">
        <img src="/images/ui/edit.png" alt="edit-image" className="w-28 md:w-32 -rotate-6 translate-x-10 z-10 drop-shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer" />
        <img src="/images/ui/home.png" alt="home-image" className="w-28 md:w-36 z-20 drop-shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer" />
        <img src="/images/ui/search.png" alt="search-image" className="w-28 md:w-32 rotate-6 -translate-x-10 z-10 drop-shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer" />
      </div>
    </section>
  );
};

export default HeroComponent;
