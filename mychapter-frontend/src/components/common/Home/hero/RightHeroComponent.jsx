import SearchButtonComponent from "@/components/common/Home/SearchButton";
import TagNotesComponent from "@/components/common/Home/TagNotesComponent";

const RightHeroComponent = () => {
  return (
    <div className="md:flex md:flex-col md:gap-5 xl:gap-10 ">
      <SearchButtonComponent />
      <TagNotesComponent />
    </div>
  );
};

export default RightHeroComponent;
