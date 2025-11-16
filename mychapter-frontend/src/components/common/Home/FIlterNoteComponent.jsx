import { Button } from "@/components/ui/button";
import { useState } from "react";

const FilterNoteComponent = () => {
  const [activeTab, setActiveTab] = useState("All Notes");

  const tabs = ["All Notes", "Important Notes", "Favorite Notes", "Latest Notes", "Archive Notes"];

  const handleFilter = ({ name }) => {
    setActiveTab(name);
  };

  return (
    <div className="mt-10 w-10/12 mx-auto flex flex-col items-center justify-center p-4">
      <div className="flex overflow-x-auto scrollbar-hide p-4 max-w-full lg:max-w-6xl gap-5">
        {tabs.map((tab) => (
          <Button key={tab} onClick={handleFilter}>
            {tab}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterNoteComponent;
