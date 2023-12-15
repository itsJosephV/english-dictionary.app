import { Fragment, useEffect, useMemo, useRef, useState } from "react";

// Components
import DefinitionCard from "./components/DefinitionCard";
import LoadingData from "./components/LoadingData";
import ErrorMessage from "./components/ErrorMessage";
import Introduction from "./components/Introduction";
import SynAndAntToggle from "./components/SynAndAntToggle";

// Types
import { Definition } from "./types";
import { Meaning } from "./types";
import { SynAndAntItems } from "./types";

// Icons
import { CaretDown } from "./icons/CaretDown";
import { CaretUp } from "./icons/CaretUp";

// Utils
import { handleSynAndAntKey } from "./utils/keyboardutils/handleSynAndAntKey";
import { handleLessDataKey } from "./utils/keyboardutils/handleLessDataKey";
import { handleMoreDataKey } from "./utils/keyboardutils/handleMoreDataKey";

// Hooks
import { useFetchDictionary } from "./utils/data/useFetchDictionary";
import SynAndAntCards from "./components/SynAndAntCards";
import RestartButton from "./components/RestartButton";
import Form from "./components/Form";
import Header from "./components/Header";

function App() {
  const [limit, setLimit] = useState<number | null>(5);
  const [autofocus, SetAutoFocus] = useState<boolean>(true);
  const [cleaner, setCleaner] = useState<boolean>(false);
  const [isSynAndAntActive, SetIsSynAndAntActive] = useState<boolean>(false);
  const [onSynAntWord, setOnSynAntWord] = useState<string | null>(null);

  const form = useRef<HTMLFormElement>(null);
  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);
  const synAndAntRef = useRef<HTMLButtonElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const {
    data,
    error,
    isLoading,
    firstWords,
    firstInArr,
    setData,
    setError,
    setFirstInArr,
    fetchDictionary,
  } = useFetchDictionary();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnSynAntWord(null);
    setLimit(5);
    const word = form.current?.word.value;
    if (word.length === 0) {
      return;
    }
    fetchDictionary(word, true);
    setCleaner(true);
  };

  console.log(firstWords);

  //! INTEGRATE NEW API TO GET RID OF ALL THESE
  //! INTEGRATE NEW API TO GET RID OF ALL THESE
  const wordObject: Definition[] = useMemo(() => {
    return (
      data?.meanings?.flatMap((meaning: Meaning) =>
        meaning.definitions.map((definition) => ({
          definition: definition.definition,
          example: definition.example,
          partOfSpeech: meaning.partOfSpeech,
        }))
      ) ?? []
    );
  }, [data?.meanings]);

  const synAndAnt: SynAndAntItems = (data?.meanings ?? []).reduce(
    (result, item) => {
      const synonyms = item.synonyms ?? [];
      const antonyms = item.antonyms ?? [];

      if (synonyms.length > 0 || antonyms.length > 0) {
        result.synonyms.push(...synonyms);
        result.antonyms.push(...antonyms);
      }

      return result;
    },
    { synonyms: [] as string[], antonyms: [] as string[] }
  );

  const sanitizedSynAndAnt = synAndAnt
    ? {
        synonyms: [...new Set(synAndAnt.synonyms?.filter(Boolean))],
        antonyms: [...new Set(synAndAnt.antonyms?.filter(Boolean))],
      }
    : {};

  //? Helpers to avoid unnecessary shorcuts calls when no data
  const formBool: boolean = Boolean(form.current?.word.value);
  const synAndAntBool: boolean = Boolean(
    sanitizedSynAndAnt.antonyms?.length || sanitizedSynAndAnt.synonyms?.length
  );

  //! INTEGRATE NEW API TO GET RID OF ALL THESE
  //! INTEGRATE NEW API TO GET RID OF ALL THESE

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    form.current?.reset();
    setData(null);
    setError("");
    setLimit(null);
    SetIsSynAndAntActive(false);
    setCleaner(false);
    setFirstInArr(false);
  };

  const handleSynAndAntButton = () => {
    if (!data) {
      return;
    }
    SetIsSynAndAntActive(!isSynAndAntActive);
  };

  const handleWhipeKeys = (e: KeyboardEvent) => {
    if (!data && !formBool) {
      return;
    }
    if (e.shiftKey && e.key === "C") {
      e.preventDefault();
      clearButtonRef.current?.click();
    }
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
    if (onSynAntWord !== null) {
      if (form.current) {
        form.current.word.value = onSynAntWord;
        fetchDictionary(onSynAntWord, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSynAntWord]);

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

  // const isMac = navigator.userAgent.indexOf("Mac") != -1;
  // const isWin = navigator.userAgent.indexOf("Win") != -1;

  useEffect(() => {
    document.addEventListener("keydown", handleWhipeKeys);
    return () => {
      document.removeEventListener("keydown", handleWhipeKeys);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formBool]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleMoreDataKey(e, limit, wordObject, moreDataRef);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [limit, wordObject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleLessDataKey(e, limit, data, lessDataRef);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [limit, data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleSynAndAntKey(e, synAndAntBool, synAndAntRef);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [synAndAntBool]);

  return (
    <main className="min-h-screen mx-auto pb-5">
      <section className="mb-5 pt-14 border-b bg-neutral-900 border-neutral-600/60 pb-5">
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
          <SynAndAntToggle
            handleSynAndAntButton={handleSynAndAntButton}
            synAndAntBool={synAndAntBool}
            isSynAndAntActive={isSynAndAntActive}
            synAndAntRef={synAndAntRef}
          />
          {firstInArr && (
            <RestartButton handleBackToFirst={handleBackToFirst} />
          )}
        </div>

        {isSynAndAntActive && (
          <SynAndAntCards
            synonyms={sanitizedSynAndAnt.synonyms}
            antonyms={sanitizedSynAndAnt.antonyms}
            setOnSynWord={setOnSynAntWord}
          />
        )}

        <section>
          {isLoading && <LoadingData />}
          {error && <ErrorMessage error={error} />}
          {data
            ? data && (
                <Fragment>
                  <div className="flex items-center flex-wrap mb-2 mt-5">
                    <p className="text-3xl font-semibold mr-2">{data?.word}</p>
                    <p className="text-neutral-400">
                      {data?.phonetics[0]?.text}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-neutral-500 text-xs ">
                      {wordObject.length} Results found
                    </p>
                  </div>
                  <ul>
                    {wordObject
                      ?.slice(0, limit ? limit : wordObject.length)
                      .map((item, i) => (
                        <DefinitionCard key={i} item={item} />
                      ))}
                  </ul>
                  {wordObject.length > 5 ? (
                    limit ? (
                      <button
                        ref={moreDataRef}
                        className="flex items-center text-sm text-neutral-400 hover:text-white duration-200 mt-2"
                        onClick={() => setLimit(null)}
                      >
                        More results
                        <span>
                          <CaretDown />
                        </span>
                      </button>
                    ) : (
                      <button
                        ref={lessDataRef}
                        className="flex items-center text-sm text-neutral-400 hover:text-white duration-200 mt-2"
                        onClick={() => setLimit(5)}
                      >
                        Less results
                        <span>
                          <CaretUp />
                        </span>
                      </button>
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
