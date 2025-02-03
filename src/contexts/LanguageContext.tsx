import {LangaugeOptions} from "@/types";
import {TFunction} from "i18next";
import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

type LaguageContextType = {
  t: TFunction<"translation", undefined>;
  handleChangeLanguage: () => void;
  currentLanguage: LangaugeOptions;
};

export const LanguageContext = createContext<LaguageContextType | null>(null);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === null) throw new Error("useLanguage must be used withint a LanguageProvider");
  return context;
};

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {
    t,
    i18n: {changeLanguage},
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<LangaugeOptions>("en");
  const handleChangeLanguage = useCallback(() => {
    const newLanguage = currentLanguage === "en" ? "zh" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }, [changeLanguage, currentLanguage]);

  useEffect(() => {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const localeLanguage = locale.split("-")[0];
    if (localeLanguage === "zh") {
      setCurrentLanguage(localeLanguage);
      handleChangeLanguage();
    }
  }, []);

  return <LanguageContext.Provider value={{t, handleChangeLanguage, currentLanguage}}>{children}</LanguageContext.Provider>;
};
