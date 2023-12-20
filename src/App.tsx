import { Fragment, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

//Types
import { WordResults } from "./types";

// Components
import DefinitionCard from "./components/DefinitionCard";
import { LoadingData } from "./icons/LoadingData";
import ErrorMessage from "./components/ErrorMessage";
import Introduction from "./components/Introduction";
import SimilarToToggle from "./components/SimilarToToggle";
import RestartButton from "./components/RestartButton";
import Form from "./components/Form";
import Header from "./components/Header";
import SimilarToCard from "./components/SimilarToCard";
import { MoreAndLess } from "./components/MoreAndLess";

// Hooks
import { useFetchDictionary } from "./utils/data/useFetchDictionary";

function App() {
  const [resultsLimit, setResultsLimit] = useState<number | null>(5);
  const [IsAutofocusEn, setIsAutoFocusEn] = useState<boolean>(true);
  const [isSimilarWordsActive, setIsSimilarWordsActive] = useState<boolean>(false);
  const [onSimilarToWords, setOnSimilarToWords] = useState<string | null>(null);
  const [onSynAntWords, setOnSynAntWords] = useState<string | null>(null);

  const form = useRef<HTMLFormElement>(null);
  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);
  const similarToRef = useRef<HTMLButtonElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const {
    dictionaryData,
    similarToData,
    error,
    isLoading,
    storedWords,
    isReseteableEn,
    isClearEn,
    setDictionaryData,
    setSimilarToData,
    fetchDictionaryRandom,
    setError,
    fetchDictionary,
    setIsClearEn,
    setIsReseteableEn,
  } = useFetchDictionary();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnSimilarToWords(null);
    setOnSynAntWords(null);
    setResultsLimit(5);
    const word = form.current?.word.value;
    if (word.length === 0) {
      return;
    }
    fetchDictionary(word, true);
    setIsReseteableEn(false);
  };

  //? Helpers to avoid unnecessary shorcuts calls when no data
  const formBool: boolean = Boolean(form.current?.word.value);
  const similarToBool: boolean = Boolean(similarToData?.similarTo?.length);

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    form.current?.reset();
    setDictionaryData(null);
    setSimilarToData(null);
    setError("");
    setResultsLimit(null);
    setIsSimilarWordsActive(false);
    setIsClearEn(false);
    setIsReseteableEn(false);
  };

  const handleSimilarToButton = () => {
    if (!dictionaryData) {
      return;
    }
    setIsSimilarWordsActive(!isSimilarWordsActive);
  };

  const handleBackToFirst = () => {
    const firstWordInArr = storedWords[0];
    if (storedWords && form.current) {
      fetchDictionary(firstWordInArr, true);
      form.current.word.value = firstWordInArr;
      setIsReseteableEn(false);
    }
  };

  //? Perf: better testing & improve — useCallback?
  useEffect(() => {
    if (onSimilarToWords !== null) {
      if (form.current) {
        form.current.word.value = onSimilarToWords;
        fetchDictionary(onSimilarToWords, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSimilarToWords]);

  useEffect(() => {
    if (onSynAntWords !== null) {
      if (form.current) {
        form.current.word.value = onSynAntWords;
        fetchDictionary(onSynAntWords, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSynAntWords]);

  useEffect(() => {
    if (dictionaryData?.word) {
      if (form.current) {
        form.current.word.value = dictionaryData.word;
      }
    }
  }, [dictionaryData?.word]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z]$/;
      const inputValue = form.current?.word.value;

      if (e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      if (IsAutofocusEn) {
        if (
          regex.test(e.key) ||
          (inputValue.length > 0 && e.key === "Backspace")
        ) {
          form.current?.word.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [IsAutofocusEn]);

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

  useHotkeys(
    "shift+m",
    (e) => {
      e.preventDefault();

      if (
        resultsLimit === null ||
        (dictionaryData?.results as Array<WordResults>).length < 5
      ) {
        return;
      }

      moreDataRef.current?.click();
      console.log("more data");
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "shift+l",
    (e) => {
      e.preventDefault();
      if (resultsLimit === 5 || !dictionaryData) {
        return;
      }
      lessDataRef.current?.click();
      console.log("less data");
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "shift+s",
    (e) => {
      e.preventDefault();
      if (!similarToBool) {
        return;
      }
      similarToRef.current?.click();
      console.log("Similar to open");
    },
    { enableOnFormTags: ["INPUT"] }
  );

  console.log(dictionaryData);
  console.log(similarToData);
  // console.log(dataDictionary?.word);
  // console.log(firstWords);
  return (
    <main className="mx-auto pb-5 min-h-screen">
      <section className="mb-5 pt-16 border-b bg-neutral-900 border-neutral-600/40 pb-5">
        <Header isAutoFocusEn={IsAutofocusEn} setIsAutoFocusEn={setIsAutoFocusEn} />
      </section>
      <article className="max-w-[850px] mx-auto px-5">
        <Form
          form={form}
          cleaner={isClearEn}
          clearButtonRef={clearButtonRef}
          handleFormSubmit={handleFormSubmit}
          handleCleanResults={handleCleanResults}
        />
        <div className="mt-1.5 flex justify-between items-center">
          <SimilarToToggle
            handleSimilarToButton={handleSimilarToButton}
            similarToBool={similarToBool}
            isSimilarWordsActive={isSimilarWordsActive}
            similarToRef={similarToRef}
          />
          {isReseteableEn && (
            <RestartButton handleBackToFirst={handleBackToFirst} />
          )}
        </div>

        {isSimilarWordsActive && (
          <SimilarToCard
            similarToData={similarToData}
            setOnSimilarToWords={setOnSimilarToWords}
          />
        )}
        <section>
          {isLoading && <LoadingData />}
          {error && <ErrorMessage error={error} />}
          {!dictionaryData && !isLoading && !error && (
            <Introduction
              fetchDictionaryRandom={fetchDictionaryRandom}
              form={form}
            />
          )}
          {dictionaryData && (
            <Fragment>
              <div className="flex items-center flex-wrap mb-2 mt-5">
                <p className="text-3xl font-semibold mr-2">
                  {dictionaryData.word}
                  {"  "}
                  {dictionaryData.pronunciation && (
                    <span className="text-[1.2rem] text-neutral-400">{`/${dictionaryData.pronunciation?.all}/`}</span>
                  )}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-neutral-500 text-xs ">
                  {dictionaryData.results && dictionaryData.results.length}{" "}
                  Results found
                </p>
              </div>
              <ul>
                {dictionaryData.results
                  ?.slice(0, resultsLimit ? resultsLimit : dictionaryData.results.length)
                  .map((item, i) => (
                    <DefinitionCard
                      key={i}
                      item={item}
                      setOnSynAntWords={setOnSynAntWords}
                    />
                  ))}
              </ul>
              {dictionaryData.results && dictionaryData.results.length > 5 ? (
                resultsLimit ? (
                  <MoreAndLess
                    dataRef={moreDataRef}
                    setResultsLimit={setResultsLimit}
                    dataValue={null}
                  />
                ) : (
                  <MoreAndLess
                    dataRef={lessDataRef}
                    setResultsLimit={setResultsLimit}
                    dataValue={5}
                  />
                )
              ) : null}
            </Fragment>
          )}
        </section>
      </article>
    </main>
  );
}

export default App;
