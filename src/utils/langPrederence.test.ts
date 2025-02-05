import {describe, expect, it} from "vitest";
import {getDefaultLangPreference} from ".";

describe("getDefaultLangPreference from local storage", () => {
  it("should return 'en' if no default language preference is set", () => {
    const languagePreference = getDefaultLangPreference();
    expect(languagePreference).toStrictEqual("en");
  });

  it("should return 'zh' if default langauge preference is set to 'zh'", () => {
    localStorage.setItem("i18nextLng", "zh");
    const languagePreference = getDefaultLangPreference();
    expect(languagePreference).toStrictEqual("zh");
  });

  it("should return 'en' if default langauge preference is set to 'en'", () => {
    localStorage.setItem("i18nextLng", "en");
    const languagePreference = getDefaultLangPreference();
    expect(languagePreference).toStrictEqual("en");
  });
});
