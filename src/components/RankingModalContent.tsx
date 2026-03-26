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
        setRankingData(data);
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="">
        <h3 className="text-xl font-bold mb-2">{t("rankingChart.ranking")}</h3>
        {rankingData && rankingData.length > 0 ? (
          rankingData.map((player, index) => (
            <div key={index} className="flex justify-between items-center text-white text-lg font-bold py-2">
              <div className="flex items-center">
                <span className="mr-2">{index + 1}.</span>
                <span>{player.name}</span>
              </div>
              <span>{player.score} xp</span>
            </div>
          ))
        ) : (
          <div className="animate-pulse">
            <div className="flex justify-between items-center text-white text-lg font-bold py-2">
              <div className="flex items-center">
                <div className="h-6 w-6 bg-slate-700 rounded mr-2"></div>
                <div className="h-6 w-32 bg-slate-700 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-slate-700 rounded"></div>
            </div>
            <div className="flex justify-between items-center text-white text-lg font-bold py-2">
              <div className="flex items-center">
                <div className="h-6 w-6 bg-slate-700 rounded mr-2"></div>
                <div className="h-6 w-32 bg-slate-700 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-slate-700 rounded"></div>
            </div>
            <div className="flex justify-between items-center text-white text-lg font-bold py-2">
              <div className="flex items-center">
                <div className="h-6 w-6 bg-slate-700 rounded mr-2"></div>
                <div className="h-6 w-32 bg-slate-700 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-slate-700 rounded"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RankingModalContent;
