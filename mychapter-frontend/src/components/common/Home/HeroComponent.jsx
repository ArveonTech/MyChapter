// components
import LeftHeroComponent from "./hero/LeftHeroComponent";
import RightHeroComponent from "./hero/RightHeroComponent";

const HeroComponent = () => {
  return (
    <div className="w-10/12 flex flex-col md:flex md:flex-row md:gap-10 justify-center items-center mx-auto md:mt-20">
      <section className="order-2 md:order-1 lg:flex-2">
        <LeftHeroComponent />
      </section>
      <section className="order-1 w-full md:w-fit md:order-2 lg:flex-1">
        <RightHeroComponent />
      </section>
    </div>
  );
};

export default HeroComponent;
