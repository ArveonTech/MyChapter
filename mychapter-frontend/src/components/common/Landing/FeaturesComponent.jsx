const features = [
  {
    title: "Show your mind",
    description: "Write down anything that comes to mind—ideas, stories, or little things you want to remember. Let each note be a reflection of yourself.",
    image: "images/ui/homeDesktop.png",
  },
  {
    title: "Add and style your notes",
    description: "Customize the look of your notes to suit your mood.With a wide selection of styles, every entry has its own unique character.",
    image: "images/ui/addDesktop.png",
  },
  {
    title: "Manage your notes anytime",
    description: "Organize everything easily mark what's important, add tags, or archive what you no longer need.",
    image: "images/ui/editDesktop.png",
  },
];

const FeaturesComponent = () => {
  return (
    <div className="overflow-hidden">
      {features.map((feature, index) => (
        <div className="px-10 mx-auto mt-20 md:mt-20 xl:px-30 " key={index} data-aos={(index + 1) % 2 === 0 ? "fade-left" : "fade-right"} data-aos-duration="1300">
          <div className="md:flex md:items-center">
            <div className={`md:w-1/2 ${(index + 1) % 2 === 0 ? "order-2" : "order-1"}`}>
              <h1 className={`text-2xl font-medium text-center ${(index + 1) % 2 === 0 ? "md:text-right" : "md:text-left"}`}>{feature.title}</h1>
              <p className={`text-sm mt-5 md:text-lg tracking-wide  ${(index + 1) % 2 === 0 ? "sm:indent-8 md:text-right" : "sm:leading-7 md:text-left"}`}>{feature.description}</p>
            </div>
            <div className={`md:w-1/2 flex justify-center overflow-visible ${(index + 1) % 2 === 0 ? "order-1 md:justify-start" : "order-2 md:justify-end"}`}>
              <img src={feature.image} alt="home-desktop-image" className={`w-full sm:w-80  mb-10 border-2 border-ring ${(index + 1) % 2 === 0 ? "md:-rotate-12" : "md:rotate-12"}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesComponent;
