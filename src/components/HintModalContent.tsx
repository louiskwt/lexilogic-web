import {useLanguageContext} from "../contexts/LanguageContext";

interface IHingModalContentProps {
  meaning: string;
  pos: string;
  vowels: string[];
}

const HintModalContent = ({meaning, pos, vowels}: IHingModalContentProps) => {
  const {t} = useLanguageContext();
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-500/15 rounded-xl">
          <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5.002 5.002 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">{t("hintModal.title")}</h2>
      </div>

      {/* Meaning card */}
      <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{t("hintModal.meaning")}</p>
        <p className="text-lg text-white leading-relaxed">
          {meaning}
          {pos && <span className="ml-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{pos}</span>}
        </p>
      </div>

      {/* Vowels card */}
      <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{t("hintModal.vowels")}</p>
        <div className="flex flex-wrap gap-2">
          {vowels.map((v, key) => (
            <span key={key} className="inline-flex items-center justify-center w-10 h-10 text-lg font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              {v.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HintModalContent;
