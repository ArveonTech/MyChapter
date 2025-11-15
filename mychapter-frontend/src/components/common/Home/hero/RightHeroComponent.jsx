import SearchButtonComponent from "../SearchButton";
import TagNotesComponent from "../TagNotesComponent";

const RightHeroComponent = () => {
  return (
    <div className="md:flex md:flex-col md:gap-5 xl:gap-10 ">
      <SearchButtonComponent />
      <TagNotesComponent />
    </div>
  );
};

export default RightHeroComponent;
