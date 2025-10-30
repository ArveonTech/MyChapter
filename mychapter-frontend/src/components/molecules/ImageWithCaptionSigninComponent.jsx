import ImageComponents from "../atoms/imageComponent";

const ImageWithCaptionSigninComponents = () => {
  return (
    <div className="w-8/12 sm:w-72 mx-auto md:mx-0 md:w-80 lg:w-96">
      <ImageComponents imageSource="/images/signin_image.png" alternativeImage="Singin-image" />
      <p className="text-2xl text-center text-textprimary hidden md:block">
        Don’t let your ideas slip away. <span className="font-semibold italic">Capture them here.</span>
      </p>
    </div>
  );
};

export default ImageWithCaptionSigninComponents;
