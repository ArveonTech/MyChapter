// utils
import { layoutRow } from "@/features/gridSlice";
import useParamsController from "@/hooks/UseParamsController";

// components
import { ArrowDown, ArrowUp, LayoutGrid, Rows2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const OrderComponent = () => {
  const valueLayoutRow = useSelector((state) => state.setLayoutRow);
  const dispatch = useDispatch();
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
    <div className="pr-10 flex items-center gap-5">
      <div className="flex gap-1 bg-secondary p-1 rounded items-center">
        <div className={` p-1 ${valueLayoutRow && "bg-muted  rounded"}`} onClick={() => dispatch(layoutRow(!valueLayoutRow))}>
          <Rows2 />
        </div>
        <div className={` p-1 ${!valueLayoutRow && "bg-muted rounded"}`} onClick={() => dispatch(layoutRow(!valueLayoutRow))}>
          <LayoutGrid />
        </div>
      </div>
      <div className="bg-secondary p-2 rounded cursor-pointer" onClick={handleClickOrder}>
        {sortBy === "oldest" ? <ArrowUp /> : <ArrowDown />}
      </div>
    </div>
  );
};

export default OrderComponent;
