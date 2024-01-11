import { useDictionaryContext } from "../context/api/useDictionaryContext";
import React, { useEffect, useRef, useState } from "react";

const useDictionaryFns = () => {
  const [word, setWord] = useState<string | null>(null);
  const [resultsLimit, setResultsLimit] = useState<number | null>(5);
  const [isSimilarWordsActive, setIsSimilarWordsActive] =
    useState<boolean>(false);
  const [onSimilarToWords, setOnSimilarToWords] = useState<string | null>(null);
  const [onSynAntWords, setOnSynAntWords] = useState<string | null>(null);
  const [isClearEn, setIsClearEn] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isAutoFocusEn, setIsAutoFocusEn] = useState<boolean>(true);


  const form = useRef<HTMLFormElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const {
    dictionaryData,
    storedWords,
    isReseteableEn,
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

  return {
    word,
    resultsLimit,
    isSimilarWordsActive,
    isAutoFocusEn,
    onSimilarToWords,
    onSynAntWords,
    isClearEn,
    isDetailsOpen,
    form,
    clearButtonRef,
    dictionaryData,
    storedWords,
    isReseteableEn,
    setWord,
    setResultsLimit,
    setIsSimilarWordsActive,
    setIsAutoFocusEn,
    setOnSimilarToWords,
    setOnSynAntWords,
    setIsClearEn,
    setIsDetailsOpen,
    handleFormSubmit,
    handleCleanResults,
    handleSimilarToButton,
    handleBackToFirst,
    // Add other functions here...
  };
};

export default useDictionaryFns;
