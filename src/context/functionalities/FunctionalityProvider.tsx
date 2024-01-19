import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { useDictionaryContext } from "../api/useDictionaryContext";
import { FunctionalityCtx } from "../../types";

export const FunctionalityContext = createContext<FunctionalityCtx | null>(
  null
);

type Props = {
  children?: ReactNode;
};

const FunctionalityProvider: React.FC<Props> = ({ children }) => {
  const [word, setWord] = useState<string | null>(null);
  const [resultsLimit, setResultsLimit] = useState<number | null>(5);
  const [isSimilarWordsActive, setIsSimilarWordsActive] =
    useState<boolean>(false);
  const [isClearEn, setIsClearEn] = useState<boolean>(false);
  const [settings, setSettings] = useState<{
    autofocus: boolean;
    details: boolean;
  }>({
    autofocus: true,
    details: false,
  });

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("settings") ?? "null"
    );
    if (savedSettings && typeof savedSettings === "object") {
      setSettings(savedSettings);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const form = useRef<HTMLFormElement>(null);

  const {
    dictionaryData,
    storedWords,
    setDictionaryData,
    setSimilarToData,
    setStoredWords,
    setError,
    fetchDictionary,
    setIsReseteableEn,
  } = useDictionaryContext();

  const handleFormSubmit = async (word: string) => {
    if (!word?.length) {
      return;
    }
    await fetchDictionary(word, true);
    setResultsLimit(5);
    setIsReseteableEn(false);
    setIsSimilarWordsActive(false);
  };

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    setWord(null);
    setDictionaryData(null);
    setSimilarToData(null);
    setError("");
    setResultsLimit(null);
    setIsSimilarWordsActive(false);
    setIsClearEn(false);
    setIsReseteableEn(false);
    setStoredWords([]);
  };

  const handleSimilarToButton = (e: React.ChangeEvent<HTMLDetailsElement>) => {
    if (!dictionaryData) {
      return;
    }
    setIsSimilarWordsActive(e.target.open);
  };

  const handleBackToFirst = () => {
    const firstWordInArr = storedWords[0];
    if (storedWords) {
      fetchDictionary(firstWordInArr, true);
      setWord(firstWordInArr);
      setIsReseteableEn(false);
    }
  };

  useEffect(() => {
    if (!dictionaryData?.word) {
      return;
    }
    setWord(dictionaryData.word);
  }, [dictionaryData?.word]);
  /**
   * Clear button displays if word in input exist
   * and persists if data exists & there's not word in input
   */
  useEffect(() => {
    setIsClearEn(!!word || (!!dictionaryData && !word));
  }, [word, dictionaryData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z]$/;

      if (e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      if (!settings.autofocus) {
        return;
      }

      if (regex.test(e.key) || (word && e.key === "Backspace")) {
        form.current?.word.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [settings.autofocus, word]);

  useEffect(() => {
    console.log(storedWords);
  }, [storedWords]);

  return (
    <FunctionalityContext.Provider
      value={{
        word,
        form,
        resultsLimit,
        isSimilarWordsActive,
        isClearEn,
        settings,
        setSettings,
        setWord,
        setResultsLimit,
        handleFormSubmit,
        handleSimilarToButton,
        handleCleanResults,
        handleBackToFirst,
      }}
    >
      {children}
    </FunctionalityContext.Provider>
  );
};

export default FunctionalityProvider;
