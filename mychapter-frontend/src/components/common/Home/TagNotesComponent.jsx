import { Button } from "@/components/ui/button";

const tagNotes = ["Life", "Hobby & Fun", "Tips & Ideas", "Work & Study", "Thoughts & Mood"];

const TagNotesComponent = () => {
  return (
    <section className="hidden md:block">
      <div className="flex flex-wrap gap-5">
        {tagNotes.map((tag, index) => (
          <Button key={index}>{tag}</Button>
        ))}
      </div>
    </section>
  );
};

export default TagNotesComponent;
