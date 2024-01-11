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
  const [isAutoFocusEn, setIsAutoFocusEn] = useState<boolean>(true);
  const [onSimilarToWords, setOnSimilarToWords] = useState<string | null>(null);
  const [onSynAntWords, setOnSynAntWords] = useState<string | null>(null);
  const [isClearEn, setIsClearEn] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  const {
    dictionaryData,
    storedWords,
    setDictionaryData,
    setSimilarToData,
    setError,
    fetchDictionary,
    setIsReseteableEn,
  } = useDictionaryContext();

  const handleFormSubmit = async (word: string) => {
    if (!word?.length) {
      return;
    }
    await fetchDictionary(word, true);
    setOnSimilarToWords(null);
    setOnSynAntWords(null);
    setResultsLimit(5);
    setIsReseteableEn(false);
    setIsSimilarWordsActive(false);
  };

  //? Helpers to avoid unnecessary shorcuts calls when no data
  // const formBool: boolean = Boolean(word?.length);

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

  //? Perf: better testing & improve — useCallback?
  useEffect(() => {
    if (!onSimilarToWords) {
      return;
    }
    setWord(onSimilarToWords);
    fetchDictionary(onSimilarToWords, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSimilarToWords]);

  useEffect(() => {
    if (!onSynAntWords) {
      return;
    }
    setWord(onSynAntWords);
    fetchDictionary(onSynAntWords, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSynAntWords]);

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

      if (!isAutoFocusEn) {
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
  }, [isAutoFocusEn, word]);

  return (
    <FunctionalityContext.Provider
      value={{
        word,
        form,
        resultsLimit,
        isSimilarWordsActive,
        isClearEn,
        isDetailsOpen,
        isAutoFocusEn,
        handleFormSubmit,
        handleCleanResults,
        handleSimilarToButton,
        handleBackToFirst,
        setIsAutoFocusEn,
        setIsDetailsOpen,
        setWord,
        setResultsLimit,
        setOnSynAntWords,
        setOnSimilarToWords,
      }}
    >
      {children}
    </FunctionalityContext.Provider>
  );
};

export default FunctionalityProvider;
