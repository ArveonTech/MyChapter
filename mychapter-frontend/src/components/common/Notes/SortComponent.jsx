// utils
import useParamsController from "@/hooks/UseParamsController";

// components
import { ArrowDown, ArrowUp } from "lucide-react";

const OrderComponent = () => {
  const { getAllParam, setManyParam, getParam } = useParamsController();

  const sortBy = getParam("sortBy") || "latest";

  const handleClickOrder = () => {
    const nextSort = sortBy === "latest" ? "oldest" : "latest";

    const current = getAllParam();
    setManyParam({
      ...current,
      sortBy: nextSort,
    });
  };

  return (
    <div className="pr-10">
      <div className="bg-secondary p-1 rounded cursor-pointer" onClick={handleClickOrder}>
        {sortBy === "oldest" ? <ArrowUp /> : <ArrowDown />}
      </div>
    </div>
  );
};

export default OrderComponent;
