import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import supabase from "../supabaseClient";

const RankingModalContent = () => {
  const {profile} = useAuthContext();
  const [weeklyXP, setWeeklyXP] = useState(0);

  useEffect(() => {
    const fetchWeeklyXP = async () => {
      if (profile) {
        const {data, error} = await supabase.from("profiles").select("weekly_xp").eq("id", profile?.id).single();

        if (error) {
          console.error("Error fetching weekly XP:", error);
        } else {
          setWeeklyXP(data.weekly_xp);
        }
      }
    };

    fetchWeeklyXP();
  }, [profile]);

  return (
    <>
      {!profile ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view the rankings</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log In</button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Hi {profile.username}</h2>
          <div className="flex flex-col justify-center items-center mb-4 xp-display">
            <p className="text-xl font-semibold">Your weekly XP:</p>
            <p className="text-4xl font-bold">{weeklyXP}</p>
          </div>

          <div className="border-t border-white pt-4 ranking">
            <h3 className="text-xl font-bold mb-2">Ranking</h3>
            {[
              {rank: 1, name: "Player 1", score: 100},
              {rank: 2, name: "Player 2", score: 90},
              {rank: 3, name: "Player 3", score: 80},
              {rank: 4, name: "Player 4", score: 70},
              {rank: 5, name: "Player 5", score: 60},
            ].map((player, index) => (
              <div key={index} className="flex justify-between items-center text-white text-lg font-bold py-2">
                <span>{player.rank}.</span>
                <span>{player.name}</span>
                <span>{player.score}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default RankingModalContent;
