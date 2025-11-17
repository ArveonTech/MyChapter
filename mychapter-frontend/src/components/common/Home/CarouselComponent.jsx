import AutoPlay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useIsWide } from "@/utils/isWide";

const carouselData = [
  {
    title: "Stories in Pages ✨",
    description: "Every page carries a story waiting to be understood. Within it lies a new perspective that broadens how we see the world.",
    image: "images/imageCarousel/image1.png",
    styleClass: "flex flex-col lg:flex-row",
    textPosition: "absolute md:relative top-10 md:top-0 left-1/2 max-h-[400px] -translate-x-1/2",
    imgClass: "w-full lg:w-[80%]",
  },
  {
    title: "Whispers in Pages 🍃",
    description: "Some stories speak softly yet leave a lasting impression. In those quiet passages, we uncover meanings hidden beneath the surface. ",
    image: "images/imageCarousel/image2.png",
    styleClass: "flex flex-col lg:flex-row",
    textPosition: "absolute md:relative top-10 md:top-0 left-1/2 max-h-[400px] -translate-x-1/2",
    imgClass: "w-full lg:w-[80%] translate-y-10 lg:translate-0",
  },
  {
    title: "Lost in a good book 📖",
    description: "The right book often brings a rare sense of calm. Through its pages, we find a brief escape from the noise of daily life. ",
    image: "images/imageCarousel/image3.png",
    styleClass: "flex flex-col lg:flex-row",
    textPosition: "absolute md:relative bottom-5 md:bottom-0 left-1/2 max-h-[400px] -translate-x-1/2",
    imgClass: "w-full -translate-y-10 lg:translate-0 lg:w-[80%]",
  },
  {
    title: "Pages Remember You 📚",
    description: "A book does more than tell a story; it preserves the memory of reading it. Each return to its pages reflects how much we ourselves have grown. ",
    image: "images/imageCarousel/image4.png",
    styleClass: "flex flex-col lg:flex-row",
    textPosition: "absolute md:relative bottom-5 md:bottom-0 left-1/2 max-h-[400px] -translate-x-1/2",
    imgClass: "w-full -translate-y-10 lg:translate-0 lg:w-[80%]",
  },
];

const CarouselComponent = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const wide = useIsWide();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel plugins={[AutoPlay({ delay: 5000 })]} className="hidden xm:block w-10/12 md:w-96 lg:w-full mx-auto mt-20 md:mt-0" setApi={setApi}>
      <CarouselContent>
        {carouselData.map((item, index) => (
          <CarouselItem key={index} className="h-full">
            <div className={`bg-secondary p-4 rounded-2xl flex ${item.styleClass} items-center gap-4 relative  lg:min-h-[200px]`}>
              <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col lg:h-full justify-center">
                <h1 className={`text-[clamp(10px,10vw,28px)] xm:text-xl sm:text-2xl font-medium font-serif ${item.textPosition}`}>{item.title}</h1>
                <p className="italic mt-2 hidden lg:block">" {item.description} "</p>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                <img src={item.image} alt={item.title} className={item.imgClass} />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-2 mt-5 justify-center">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => api && api.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-all
              ${current === index ? "bg-accent-foreground" : "bg-muted"}`}
          ></button>
        ))}
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
