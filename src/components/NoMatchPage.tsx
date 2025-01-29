import {NavLink} from "react-router";
import {useLanguageContext} from "../contexts/LanguageContext";

const NoMatchPage = () => {
  const {t} = useLanguageContext();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800 text-white">
      <div className="flex flex-col items-center text-center">
        <span className="text-6xl mb-4">🤔</span>
        <h1 className="text-4xl font-bold mb-4">{t("pageNotFound")}</h1>
        <p className="text-lg text-center">{t("noMatchPageMessage")}</p>
        <NavLink to="/" className="mt-4 bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded">
          {t("back")}
        </NavLink>
      </div>
    </div>
  );
};

export default NoMatchPage;
