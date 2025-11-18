import { Button } from "@/components/ui/button";
import { filterHome } from "@/features/filterNoteHomeSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const FilterNoteComponent = () => {
  const [activeTab, setActiveTab] = useState("All Notes");
  const dispatch = useDispatch();

  const tabs = [
    { title: "All Notes", value: "" },
    { title: "Pinned Notes", value: "pinned" },
    { title: "Favorite Notes", value: "favorite" },
    { title: "Latest Notes", value: "latest" },
    { title: "Archive Notes", value: "archive" },
  ];

  const handleFilter = (event) => {
    setActiveTab(event.target.innerText);
    dispatch(filterHome(event.target.value));
  };

  return (
    <div className="mt-10 w-10/12 mx-auto flex flex-col items-center justify-center p-4">
      <div className={`flex overflow-x-auto scrollbar-hide p-4 max-w-full lg:max-w-6xl gap-5 `}>
        {tabs.map((tab) => (
          <Button key={tab.value} onClick={handleFilter} value={tab.value} className={`${activeTab === tab.title ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"} `}>
            {tab.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterNoteComponent;
