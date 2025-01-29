const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800 text-white">
      <div className="flex flex-col items-center">
        <span className="text-6xl mb-4">😟</span>
        <h1 className="text-4xl font-bold mb-2">⚠️Error⚠️</h1>
        <p className="text-xl">🚧 Something went wrong. Please try again later. 🚧</p>
      </div>
    </div>
  );
};

export default ErrorPage;
