import {useEffect, useState} from "react";
import {useLanguageContext} from "../contexts/LanguageContext";
import {getScores} from "../utils";

type RankingData = {
  name: string;
  score: string;
};

const RankingModalContent = () => {
  const {t} = useLanguageContext();
  const [rankingData, setRankingData] = useState<RankingData[] | null>(null);

  async function fetchRanking(): Promise<RankingData[]> {
    const data = await getScores();
    return data;
  }

  useEffect(() => {
    let cancelled = false;
    if (cancelled) return;

    fetchRanking()
      .then((data) => {
        setRankingData(data.sort((a, b) => +b.score - +a.score));
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="flex flex-col max-h-[60vh] max-w-[90vw]">
        <h3 className="text-2xl font-bold mb-4">{t("rankingChart.ranking")}</h3>

        {rankingData && rankingData.length > 0 ? (
          <div className="overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
            {rankingData.map((player, index) => {
              const medals = ["🥇", "🥈", "🥉"];
              const isTop3 = index < 3;

              return (
                <div key={index} className={`flex justify-between items-center rounded-xl px-4 py-3 transition-colors ${isTop3 ? "bg-zinc-700/50 border border-zinc-600/50" : "bg-zinc-800/30"}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg w-8 text-center flex-shrink-0">{isTop3 ? medals[index] : <span className="text-zinc-500 text-sm font-mono">{index + 1}</span>}</span>
                    <span className={`truncate ${isTop3 ? "font-bold text-white" : "font-medium text-zinc-300"}`}>{player.name}</span>
                  </div>
                  <span className={`ml-4 flex-shrink-0 tabular-nums ${isTop3 ? "text-lime-400 font-bold" : "text-zinc-400 font-medium"}`}>
                    {player.score} <span className="text-xs">pts</span>
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* Skeleton loader */
          <div className="space-y-1 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center rounded-xl px-4 py-3 bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-zinc-700 rounded-full" />
                  <div className="h-5 w-24 bg-zinc-700 rounded-md" />
                </div>
                <div className="h-5 w-14 bg-zinc-700 rounded-md" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RankingModalContent;
