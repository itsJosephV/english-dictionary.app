import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

// Components
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";

// Hooks
import { useFetchDictionary } from "./utils/data/useFetchDictionary";
import List from "./components/List";
import FavoriteWords from "./components/FavoriteWords";
import SettNav from "./components/SettNav";

const App = () => {
  const [word, setWord] = useState<string | null>(null);
  const [resultsLimit, setResultsLimit] = useState<number | null>(5);
  const [isAutoFocusEn, setIsAutoFocusEn] = useState<boolean>(true);
  const [isSimilarWordsActive, setIsSimilarWordsActive] =
    useState<boolean>(false);
  const [onSimilarToWords, setOnSimilarToWords] = useState<string | null>(null);
  const [onSynAntWords, setOnSynAntWords] = useState<string | null>(null);
  const [isClearEn, setIsClearEn] = useState<boolean>(false);

  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);


  const {
    dictionaryData,
    similarToData,
    error,
    isLoading,
    storedWords,
    isReseteableEn,
    setDictionaryData,
    setSimilarToData,
    fetchDictionaryRandom,
    setError,
    fetchDictionary,
    setIsReseteableEn,
  } = useFetchDictionary();

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
  const formBool: boolean = Boolean(word?.length);
  const similarToBool: boolean = Boolean(similarToData?.similarTo?.length);

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

  useHotkeys(
    "shift+c",
    (e) => {
      e.preventDefault();

      if (!dictionaryData && !formBool) {
        return;
      }
      clearButtonRef.current?.click();
      console.log("data whiped");
    },
    { enableOnFormTags: ["INPUT"] }
  );

  return (
    <>
      <SettNav
        isAutoFocusEn={isAutoFocusEn}
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setIsAutoFocusEn={setIsAutoFocusEn}
      />
      <main className="max-w-[640px] mx-auto pt-16 px-5 pb-6 min-h">
        <section className="mb-10">
          <FavoriteWords />
        </section>
        <section className="mb-5">
          <Form
            form={form}
            cleaner={isClearEn}
            clearButtonRef={clearButtonRef}
            handleFormSubmit={handleFormSubmit}
            handleCleanResults={handleCleanResults}
            word={word}
            setWord={setWord}
            handleBackToFirst={handleBackToFirst}
            isReseteableEn={isReseteableEn}
          />
          <SimilarToList
            handleSimilarToButton={handleSimilarToButton}
            similarToBool={similarToBool}
            isSimilarWordsActive={isSimilarWordsActive}
            similarToData={similarToData}
            setOnSimilarToWords={setOnSimilarToWords}
          />
        </section>
        <List
          resultsLimit={resultsLimit}
          setOnSynAntWords={setOnSynAntWords}
          setResultsLimit={setResultsLimit}
          dictionaryData={dictionaryData}
          fetchDictionaryRandom={fetchDictionaryRandom}
          error={error}
          isLoading={isLoading}
          isDetailsOpen={isDetailsOpen}
        />
      </main>
    </>
  );
};

export default App;
