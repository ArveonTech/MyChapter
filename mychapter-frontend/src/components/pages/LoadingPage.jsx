const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-bgPage">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-bgInteractive border-t-transparent rounded-full animate-spin"></div>
        <p className="text-textprimary text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
