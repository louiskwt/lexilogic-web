const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800 text-white">
      <div className="flex flex-col items-center text-center">
        <span className="text-6xl mb-4">😟</span>
        <h1 className="text-4xl font-bold mb-2">⚠️Error⚠️</h1>
        <p className="text-xl mb-3">🚧 Something went wrong. Please try again later. 🚧</p>
        <p className="text-xl">🚧 哎呀,看起來出了點小問題。請等下再試一次吧 🚧</p>
      </div>
    </div>
  );
};

export default ErrorPage;
