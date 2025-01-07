import {Link} from "react-router";

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
      <header className="flex justify-center mb-8">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <img src="/logo512.png" alt="Logo" className="object-fill w-full h-full" />
        </div>
      </header>
      <h1 className="text-4xl font-bold mb-8 text-center">Lexi Game - Let's play and learn</h1>

      <div className="flex flex-col space-y-5 px-8">
        {games.map((game, key) => (
          <div className="bg-zinc-800 rounded-l border-2 overflow-hidden shadow-md " key={key}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
              <p className="text-gray-400 mb-4">{game.desc}</p>
              <Link className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 block w-full text-center" to={`/${game.name.toLowerCase()}`}>
                Play
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
