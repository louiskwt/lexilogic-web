interface ILanguageModalContentProps {
  language: "en-US" | "en-UK";
  handleLanguageChange: (newLanguage: "en-US" | "en-UK") => void;
}

const LanguageModalContent = ({language, handleLanguageChange}: ILanguageModalContentProps) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-2">Language</h3>
      <p className="text-xl mb-4 font-semibold">
        你可以選擇英式或者美式嘅串法
        <br />
      </p>
      <div className="flex space-x-4 mt-8 ">
        <button className={`px-4 py-2 rounded-md ${language === "en-US" ? "bg-lime-600 text-white" : "bg-gray-200"}`} onClick={() => handleLanguageChange("en-US")}>
          English (US)
        </button>
        <button className={`px-4 py-2 rounded-md ${language === "en-UK" ? "bg-lime-600 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => handleLanguageChange("en-UK")}>
          English (UK)
        </button>
      </div>
    </>
  );
};

export default LanguageModalContent;
