// utils
import { Link } from "react-router-dom";

// components
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

const NavigationComponent = () => {
  const titleNote = useSelector((state) => state.titleQuillNote);
  const contentNote = useSelector((state) => state.contentQuillNote);
  const attributeNote = useSelector((state) => state.attributeNote);


  console.info(titleNote)
  console.info(contentNote)
  console.info(attributeNote)

  return (
    <nav className="px-5 xss:px-10 flex justify-between">
      <Link to={`/home`}>
        <div className="bg-primary text-primary-foreground p-2 rounded-3xl">
          <ArrowLeft />
        </div>
      </Link>
      <div className="bg-primary text-primary-foreground xm:w-20 p-2 rounded-2xl">
        <h1 className="text-center">Add</h1>
      </div>
    </nav>
  );
};

export default NavigationComponent;
