const ErrorComponent = () => {
  return (
    <div className="h-52 w-full flex items-center justify-center">
      <div role="status">
        <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
        </svg>
      </div>
      <p className="text-lg lg:text-2xl text-red-600 ml-2">there is an error</p>
    </div>
  );
};

export default ErrorComponent;
