import { Fragment, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

// Components
import DefinitionCard from "./components/DefinitionCard";
import LoadingData from "./components/LoadingData";
import ErrorMessage from "./components/ErrorMessage";
import Introduction from "./components/Introduction";
import SimilarToToggle from "./components/SimilarToToggle";
import RestartButton from "./components/RestartButton";
import Form from "./components/Form";
import Header from "./components/Header";
import SimilarToCard from "./components/SimilarToCard";

// Hooks
import { useFetchDictionary } from "./utils/data/useFetchDictionary";
import { MoreAndLess } from "./components/MoreAndLess";

import { WordResults } from "./types";

function App() {
  const [limit, setLimit] = useState<number | null>(5);
  const [autofocus, SetAutoFocus] = useState<boolean>(true);
  const [isSimilarWordsActive, setIsSimilarWordsActive] =
    useState<boolean>(false);
  const [onSimilarWords, setOnSimilarWords] = useState<string | null>(null);
  const [onSynAntWords, setOnSynAntWords] = useState<string | null>(null);

  const form = useRef<HTMLFormElement>(null);
  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);
  const similarToRef = useRef<HTMLButtonElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const {
    dataDictionary,
    dataWordSimilar,
    error,
    isLoading,
    firstWords,
    firstInArr,
    cleaner,
    setDataDictionary,
    setDataWordSimilar,
    setError,
    setFirstInArr,
    fetchDictionary,
    setCleaner,
  } = useFetchDictionary();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnSimilarWords(null);
    setOnSynAntWords(null);
    setLimit(5);
    const word = form.current?.word.value;
    if (word.length === 0) {
      return;
    }
    fetchDictionary(word, true);
    setFirstInArr(false);
  };

  //? Helpers to avoid unnecessary shorcuts calls when no data
  const formBool: boolean = Boolean(form.current?.word.value);
  const similarToBool: boolean = Boolean(dataWordSimilar?.similarTo?.length);

  console.log(similarToBool);

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    form.current?.reset();
    setDataDictionary(null);
    setDataWordSimilar(null);
    setError("");
    setLimit(null);
    setIsSimilarWordsActive(false);
    setCleaner(false);
    setFirstInArr(false);
  };

  const handleSimilarToButton = () => {
    if (!dataDictionary) {
      return;
    }
    setIsSimilarWordsActive(!isSimilarWordsActive);
  };

  const handleBackToFirst = () => {
    const firstWordInArr = firstWords[0];
    if (firstWords && form.current) {
      fetchDictionary(firstWordInArr, true);
      form.current.word.value = firstWordInArr;
      setFirstInArr(false);
    }
  };

  //? Chore: better testing & improve — useCallback?
  useEffect(() => {
    if (onSimilarWords !== null) {
      if (form.current) {
        form.current.word.value = onSimilarWords;
        fetchDictionary(onSimilarWords, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSimilarWords]);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      const regex = /^[a-zA-Z]$/;
      const inputValue = form.current?.word.value;

      if (e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      if (autofocus) {
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
  }, [autofocus]);

  useHotkeys(
    "shift+C",
    (e) => {
      e.preventDefault();

      if (!dataDictionary && !formBool) {
        return;
      }
      clearButtonRef.current?.click();
      console.log("data whiped");
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "shift+M",
    (e) => {
      e.preventDefault();

      if (
        limit === null ||
        (dataDictionary?.results as Array<WordResults>).length < 5
      ) {
        return;
      }

      moreDataRef.current?.click();
      console.log("more data");
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "shift+L",
    (e) => {
      e.preventDefault();
      if (limit === 5 || !dataDictionary) {
        return;
      }
      lessDataRef.current?.click();
      console.log("less data");
    },
    { enableOnFormTags: ["INPUT"] }
  );

  useHotkeys(
    "shift+S",
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

  // console.log(dataDictionary);
  // console.log(dataWordSimilar);
  console.log(onSynAntWords);

  return (
    <main className="min-h-screen mx-auto pb-5">
      <section className="mb-5 pt-14 border-b bg-neutral-900 border-neutral-600/40 pb-5">
        <Header autofocus={autofocus} SetAutoFocus={SetAutoFocus} />
      </section>
      <article className="max-w-[850px] mx-auto px-5">
        <Form
          form={form}
          cleaner={cleaner}
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
          {firstInArr && (
            <RestartButton handleBackToFirst={handleBackToFirst} />
          )}
        </div>

        {isSimilarWordsActive && (
          <SimilarToCard
            dataWordSimilar={dataWordSimilar}
            setOnSimilarWords={setOnSimilarWords}
          />
        )}

        <section>
          {isLoading && <LoadingData />}
          {error && <ErrorMessage error={error} />}
          {dataDictionary
            ? dataDictionary && (
                <Fragment>
                  <div className="flex items-center flex-wrap mb-2 mt-5">
                    <p className="text-3xl font-semibold mr-2">
                      {dataDictionary.word}
                      {"  "}
                      {dataDictionary.pronunciation && (
                        <span className="text-[1.2rem] text-neutral-400">{`/${dataDictionary.pronunciation?.all}/`}</span>
                      )}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-neutral-500 text-xs ">
                      {dataDictionary.results.length} Results found
                    </p>
                  </div>
                  <ul>
                    {dataDictionary.results
                      ?.slice(0, limit ? limit : dataDictionary.results.length)
                      .map((item, i) => (
                        <DefinitionCard
                          key={i}
                          item={item}
                          setOnSynAntWords={setOnSynAntWords}
                        />
                      ))}
                  </ul>
                  {dataDictionary.results.length > 5 ? (
                    limit ? (
                      <MoreAndLess
                        dataRef={moreDataRef}
                        setLimit={setLimit}
                        dataValue={null}
                      />
                    ) : (
                      <MoreAndLess
                        dataRef={lessDataRef}
                        setLimit={setLimit}
                        dataValue={5}
                      />
                    )
                  ) : null}
                </Fragment>
              )
            : !isLoading && !error && <Introduction />}
        </section>
      </article>
    </main>
  );
}

export default App;
