// utils
import { layoutRow } from "@/features/gridSlice";
import useParamsController from "@/hooks/UseParamsController";
import { useDispatch, useSelector } from "react-redux";

// components
import { ArrowDown, ArrowUp, LayoutGrid, Rows2 } from "lucide-react";

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
    <div className="hidden xss:block">
      <div className="pr-10 flex items-center gap-5">
        <div className="flex gap-1 bg-secondary p-1 rounded items-center">
          <div className={` p-1 cursor-pointer ${!valueLayoutRow && "bg-muted rounded"}`} onClick={() => dispatch(layoutRow(!valueLayoutRow))}>
            <LayoutGrid />
          </div>
          <div className={` p-1 cursor-pointer ${valueLayoutRow && "bg-muted  rounded"}`} onClick={() => dispatch(layoutRow(!valueLayoutRow))}>
            <Rows2 />
          </div>
        </div>
        <div className="bg-secondary p-2 rounded cursor-pointer" onClick={handleClickOrder}>
          {sortBy === "oldest" ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
