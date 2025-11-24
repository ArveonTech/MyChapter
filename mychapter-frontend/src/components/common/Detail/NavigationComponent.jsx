// utils
import { Link } from "react-router-dom";

// components
import { ArrowLeft } from "lucide-react";

const NavigationComponent = () => {
  return (
    <nav className="px-5 xss:px-10 flex justify-between">
      <Link to={`/home`}>
        <div className="bg-primary text-primary-foreground p-2 rounded-3xl">
          <ArrowLeft />
        </div>
      </Link>
      <Link to={`/edit`}>
        <div className="bg-primary text-primary-foreground xm:w-20 p-2 rounded-2xl">
          <h1 className="text-center">Edit</h1>
        </div>
      </Link>
    </nav>
  );
};

export default NavigationComponent;
