import { Button } from "@/components/ui/button";
import { tagHome } from "@/features/tagHomeSlice";
import { useDispatch } from "react-redux";

const tagNotes = ["Life", "Hobby & Fun", "Tips & Ideas", "Work & Study", "Thoughts & Mood"];

const TagNotesComponent = () => {
  const dispatch = useDispatch();

  const handleClickTag = (event) => {
    const nameTag = event.target.innerText;
    dispatch(tagHome(nameTag));
  };

  return (
    <section className="hidden md:block">
      <div className="flex flex-wrap gap-5">
        {tagNotes.map((tag, index) => (
          <Button key={index} variant="secondary" onClick={handleClickTag}>
            {tag}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default TagNotesComponent;
