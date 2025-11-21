// utils
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useParamsController from "@/hooks/UseParamsController";

// components
import { Menu, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tagNotes = [
  { title: "All", value: "all" },
  { title: "Life", value: "life" },
  { title: "Hobby & Fun", value: "hobby & fun" },
  { title: "Tips & Ideas", value: "tips & ideas" },
  { title: "Work & Study", value: "work & study" },
  { title: "Thoughts & Mood", value: "thoughts & mood" },
];

const statusNotes = [
  { title: "All", value: "all" },
  { title: "Favorite", value: "favorite" },
  { title: "Pinned", value: "pinned" },
];

const FilteringComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [navigationHamburger, setNavigationHamburger] = useState(false);

  const sidebarRef = useRef();
  const menuButtonRef = useRef();

  const { setParam, getParam } = useParamsController();

  const tagParam = decodeURIComponent(getParam("tag"));
  const status = decodeURIComponent(getParam("status"));

  const [filter, setFilter] = useState({
    tag: tagParam && tagParam !== "null" ? tagParam : "",
    status: status && status !== "null" ? status : "",
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && menuButtonRef.current && !menuButtonRef.current.contains(e.target)) {
        setNavigationHamburger(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // md++
  const handleSelectTag = (value) => {
    setFilter((prev) => ({
      ...prev,
      tag: value,
    }));

    const newParams = new URLSearchParams(searchParams);

    if (value.trim() === "" || value === "all") {
      newParams.delete("tag");
    } else {
      newParams.set("tag", value);
    }

    setSearchParams(newParams);
  };

  const handleSelectStatus = (value) => {
    setFilter((prev) => ({
      ...prev,
      status: value,
    }));

    const newParams = new URLSearchParams(searchParams);

    if (value.trim() === "" || value === "all") {
      newParams.delete("status");
    } else {
      newParams.set("status", value);
    }

    setSearchParams(newParams);
  };

  return (
    <>
      <section className="md:hidden">
        <div className="max-w-fit mt-10 pl-10">
          <div
            className="cursor-pointer hover:bg-accent p-2 rounded-md hidden xss:block md:hidden"
            onClick={() => {
              setNavigationHamburger(!navigationHamburger);
            }}
          >
            <div ref={menuButtonRef}>
              <Menu />
            </div>
          </div>
        </div>
        <div
          className={`min-h-screen px-5 xs:px-10 w-[70%] fixed top-0 bg-sidebar/95 transition-transform duration-500 md:hidden
    overflow-y-auto max-h-screen
    ${navigationHamburger ? "translate-0 opacity-100 pointer-events-auto" : "-translate-x-96 opacity-0 pointer-events-none"}`}
          ref={sidebarRef}
        >
          <div
            className="flex justify-end  mt-10 cursor-pointer"
            onClick={() => {
              setNavigationHamburger(!navigationHamburger);
            }}
          >
            <X className="w-4 h-4 xs:w-10 xs:h-10" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const newParams = new URLSearchParams(searchParams);

              newParams.delete("pinned");
              newParams.delete("favorite");

              if (filter.tag === "all") {
                newParams.delete("tag");
              } else if (filter.tag) {
                newParams.set("tag", filter.tag);
              }

              if (filter.status === "all") {
                newParams.delete("status");
              } else if (filter.status) {
                newParams.set("status", filter.status);
              }

              setSearchParams(newParams);

              setNavigationHamburger(false);
            }}
          >
            {/* TAG */}
            <RadioGroup value={filter.tag ? filter.tag : "all"} onValueChange={(value) => setFilter((prev) => ({ ...prev, tag: value }))}>
              <h1 className="mb-5 font-bold text-xl">TAG</h1>
              {tagNotes.map((tag) => (
                <div key={tag.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={tag.value} id={tag.title} />
                  <Label htmlFor={tag.title}>{tag.title}</Label>
                </div>
              ))}
            </RadioGroup>

            {/* STATUS */}
            <RadioGroup className={`mt-10`} value={filter.status ? filter.status : "all"} onValueChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}>
              <h1 className="mb-5 font-bold text-xl">Status</h1>
              {statusNotes.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={status.value} id={status.title} />
                  <Label htmlFor={status.title}>{status.title}</Label>
                </div>
              ))}
            </RadioGroup>

            <Button className="mt-10">Search</Button>
          </form>
        </div>
      </section>
      <section className="hidden md:block">
        <div className="px-10 mt-10 flex gap-10">
          <Select value={filter.tag} onValueChange={(valueTag) => handleSelectTag(valueTag)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              {tagNotes.map((tag) => (
                <SelectItem value={tag.value} key={tag.value}>
                  {tag.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filter.status} onValueChange={(valueStatus) => handleSelectStatus(valueStatus)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusNotes.map((status) => (
                <SelectItem value={status.value} key={status.value}>
                  {status.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>
    </>
  );
};

export default FilteringComponent;
