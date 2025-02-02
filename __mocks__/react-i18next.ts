import {vi} from "vitest";
import enJSON from "../src/locale/en.json";
import zhJSON from "../src/locale/zh.json";

const mockTranslations = {
  en: {
    translation: {
      ...enJSON,
    },
  },
  zh: {
    translation: {
      ...zhJSON,
    },
  },
};

const mockI18nInstance = {
  init: vi.fn().mockReturnThis(),
  use: vi.fn().mockReturnThis(),
  changeLanguage: vi.fn().mockResolvedValue(),
  language: "en",
};

vi.mock("i18next", () => ({
  ...vi.importActual("i18next"),
  create: () => mockI18nInstance,
}));

vi.mock("react-i18next", () => ({
  ...vi.importActual("react-i18next"),
  useTranslation: () => ({
    t: (key: string) => mockTranslations["en"].translation[key] || key,
    i18n: mockI18nInstance,
  }),
}));
