// utils
import { useNavigate } from "react-router-dom";

// components
import { Button } from "@/components/ui/button";

const tagNotes = [
  { title: "Life", value: "life" },
  { title: "Hobby & Fun", value: "hobby & fun" },
  { title: "Tips & Ideas", value: "tips & ideas" },
  { title: "Work & Study", value: "work & study" },
  { title: "Thoughts & Mood", value: "thoughts & mood" },
];

const TagNotesComponent = () => {
  const navigate = useNavigate();

  const handleClickTag = (event) => {
    const valueTag = event.target.value;
    navigate(`/notes?page=1&limit=10&tag=${encodeURIComponent(valueTag)}`);
  };

  return (
    <section className="hidden md:block">
      <div className="flex flex-wrap gap-5">
        {tagNotes.map((tag, index) => (
          <Button key={index} variant="secondary" value={tag.value} onClick={handleClickTag}>
            {tag.title}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default TagNotesComponent;
