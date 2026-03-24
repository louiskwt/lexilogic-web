// import {useLanguageContext} from "../contexts/LanguageContext";

// interface IRankingData {
//   rank: number;
//   name: string;
//   xp: number;
// }

// const RankingModalContent = () => {
//   const {t} = useLanguageContext();
//   const profile = null;

//   // useEffect(() => {
//   //   const fetchRanking = async () => {
//   //       setRankingData(rankings);
//   //     }
//   //   };
//   //   fetchRanking();
//   // }, []);

//   return (
//     <>
//       {!profile ? (
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">{t("rankingChart.loginToSeeRanking")}</h2>
//           <button className="bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded" onClick={() => {}}>
//             {t("login")}
//           </button>
//         </div>
//       ) : (
//         <>
//           <h2 className="text-2xl font-bold mb-4">Hi {profile}</h2>
//           {/* <div className="flex flex-col justify-center items-center mb-4 xp-display">
//             <p className="text-xl font-semibold">{t("rankingChart.yourWeeklyXp")}</p>
//             <p className="text-4xl font-bold mt-2">{weeklyXP}</p>
//             <p className="text-xl text-gray-500 font-bold mt-2">
//               {t("rankingChart.totalXp")}
//               {profile.total_xp}
//             </p>
//           </div> */}
//         </>
//       )}
//       <div className="border-t border-white pt-4 mt-4 ranking">
//         <h3 className="text-xl font-bold mb-2">{t("rankingChart.weeklyRanking")}</h3>
//         {/* {rankingData.length > 0 ? (
//           rankingData.map((player, index) => (
//             <div key={index} className="flex justify-between items-center text-white text-lg font-bold py-2">
//               <div className="flex items-center">
//                 <span className="mr-2">{player.rank}.</span>
//                 <span>{player.name}</span>
//               </div>
//               <span>{player.xp} xp</span>
//             </div>
//           ))
//         ) : (
//           <div className="animate-pulse">
//             <div className="flex justify-between items-center text-white text-lg font-bold py-2">
//               <div className="flex items-center">
//                 <div className="h-6 w-6 bg-slate-700 rounded mr-2"></div>
//                 <div className="h-6 w-32 bg-slate-700 rounded"></div>
//               </div>
//               <div className="h-6 w-16 bg-slate-700 rounded"></div>
//             </div>
//             <div className="flex justify-between items-center text-white text-lg font-bold py-2">
//               <div className="flex items-center">
//                 <div className="h-6 w-6 bg-slate-700 rounded mr-2"></div>
//                 <div className="h-6 w-32 bg-slate-700 rounded"></div>
//               </div>
//               <div className="h-6 w-16 bg-slate-700 rounded"></div>
//             </div>
//             <div className="flex justify-between items-center text-white text-lg font-bold py-2">
//               <div className="flex items-center">
//                 <div className="h-6 w-6 bg-slate-700 rounded mr-2"></div>
//                 <div className="h-6 w-32 bg-slate-700 rounded"></div>
//               </div>
//               <div className="h-6 w-16 bg-slate-700 rounded"></div>
//             </div>
//           </div>
//         )} */}
//       </div>
//     </>
//   );
// };

// export default RankingModalContent;
