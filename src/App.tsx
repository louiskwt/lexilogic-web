interface IGame {
  name: string;
  desc: string;
}

function App() {
  const games: IGame[] = [
    {
      name: "Speller",
      desc: "Spell the word based on meaning",
    },
    {
      name: "Voice Speller",
      desc: "Listen and spell the word",
    },
    {
      name: "Phraser",
      desc: "Guess a phrase based on meaning",
    },
    {
      name: "Wordle",
      desc: "Solve a word puzzle",
    },
  ];
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Let's Play Some Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {games.map((game, key) => (
          <div className="bg-zinc-800 rounded-l border-2 overflow-hidden shadow-md" key={key}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
              <p className="text-gray-400 mb-4">{game.desc}</p>
              <button className="bg-lime-800 hover:bg-lime-600 rounded-md border-2 text-white font-bold py-2 px-4 ">Play</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
