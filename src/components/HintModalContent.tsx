import {useLanguageContext} from "../contexts/LanguageContext";

interface IHingModalContentProps {
  meaning: string;
  pos: string;
  vowels: string[];
}

const HintModalContent = ({meaning, pos, vowels}: IHingModalContentProps) => {
  const {t} = useLanguageContext();
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{t("hintModal.title")}</h2>
      <div className="flex flex-col justify-between mb-4">
        <p className="text-xl font-semibold">{t("hintModal.meaning")}:</p>
        <br />
        <p className="text-xl">
          <span className="text-white">{meaning}</span> ({pos})
        </p>
      </div>
      <div className="border-t border-white pt-4">
        <h3 className="text-xl font-bold mb-2">{t("hintModal.vowels")}</h3>
        <p className="text-white text-lg font-bold">
          {vowels.map((v, key) => (
            <span key={key}>
              {v.toUpperCase()}
              {key < vowels.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

export default HintModalContent;
