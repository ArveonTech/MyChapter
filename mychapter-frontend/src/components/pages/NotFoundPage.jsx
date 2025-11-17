import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bgPage text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-lg text-foreground mt-2">Oops! Page not found 😢</p>
      <button onClick={() => navigate("/")} className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-bgHighlight transition-all cursor-pointer">
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
