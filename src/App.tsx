import { Fragment, useEffect, useMemo, useRef, useState } from "react";

// Components
import DefinitionCard from "./components/DefinitionCard";
import LoadingData from "./components/LoadingData";
import ErrorMessage from "./components/ErrorMessage";
import Introduction from "./components/Introduction";
import InputAF from "./components/InputAF";
import SynAndAntToggle from "./components/SynAndAntToggle";
import ShortCutsInfo from "./components/ShortCutsInfo";

// Types
import { Definition } from "./types";
import { Meaning } from "./types";
import { SynAndAntItems } from "./types";

// Icons
import { IcRoundSearch } from "./icons/SearchIcon";
import { CaretDown } from "./icons/CaretDown";
import { CaretUp } from "./icons/CaretUp";
import { CleanIcon } from "./icons/CleanIcon";

// Utils
import { handleSynAndAntKey } from "./utils/keyboardutils/handleSynAndAntKey";
import { handleLessDataKey } from "./utils/keyboardutils/handleLessDataKey";
import { handleMoreDataKey } from "./utils/keyboardutils/handleMoreDataKey";

// Hooks
import { useFetchDictionary } from "./utils/data/useFetchDictionary";
import SynAndAntCards from "./components/SynAndAntCards";

function App() {
  const [limit, setLimit] = useState<number | null>(5);
  const [autofocus, SetAutoFocus] = useState<boolean>(true);
  const [cleaner, setCleaner] = useState<boolean>(false);
  const [isSynAndAntActive, SetIsSynAndAntActive] = useState<boolean>(false);
  const [onSynWord, setOnSynWord] = useState<string | null>(null);

  const form = useRef<HTMLFormElement>(null);
  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);
  const synAndAntRef = useRef<HTMLButtonElement>(null);

  const { data, error, isLoading, setData, setError, fetchDictionary } =
    useFetchDictionary();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnSynWord(null);
    setLimit(5);
    const word = form.current?.word.value;
    if (word.length === 0) {
      return;
    }

    fetchDictionary(word);
    setCleaner(true);
  };

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

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    form.current?.reset();
    setData(null);
    setError("");
    setLimit(null);
    SetIsSynAndAntActive(false);
    setCleaner(false);
  };

  const handleSynAndAntButton = () => {
    if (!data) {
      return;
    }
    SetIsSynAndAntActive(!isSynAndAntActive);
  };

  //? Chore: better testing & improve — useCallback?
  useEffect(() => {
    if (onSynWord !== null) {
      if (form.current) {
        form.current.word.value = onSynWord;
      }
      fetchDictionary(onSynWord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSynWord]);

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

  const handleWhipeKeys = (e: KeyboardEvent) => {
    if (!data && !formBool) {
      return;
    }
    if (e.shiftKey && e.key === "C") {
      e.preventDefault();
      console.log("data whiped");
      form.current?.reset();
      setData(null);
      setError("");
      setLimit(null);
      SetIsSynAndAntActive(false);
      setCleaner(false);
    }
  };

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

  useEffect(() => {
    console.log(onSynWord);
  }, [onSynWord]);

  return (
    <main className="min-h-screen mx-auto pb-5">
      <header className="mb-5 pt-14 border-b bg-neutral-900 border-neutral-600/60 pb-5">
        <div className="max-w-[850px] mx-auto px-5">
          <div className="text-orange-300 bg-orange-500/10 border border-orange-300 py-1 px-2 w-fit rounded-md mb-8">
            Dictionary App - Underwork 🚧{" "}
          </div>
          <div className="mb-8">
            <p className="text-4xl font-bold mb-1">Dictionary</p>
            <p className="text-neutral-400">
              Your personal app to search, save and learn about your favorite
              words.
            </p>
          </div>
          {/* <p>ShorCuts</p> */}
          <div className="md:items-center gap-2 flex flex-col md:flex-row justify-between w-fit md:w-[100%]">
            <ShortCutsInfo />
            <InputAF autofocus={autofocus} SetAutoFocus={SetAutoFocus} />
          </div>
        </div>
      </header>
      <article className="max-w-[850px] mx-auto px-5">
        {/* <div className="mb-2 flex justify-between items-center">
          <p className="text-neutral-400 text-xs">
            {wordObject.length} Results
          </p>
          <SynAndAntToggle
            handleSynAndAntButton={handleSynAndAntButton}
            synAndAntBool={synAndAntBool}
            isSynAndAntActive={isSynAndAntActive}
            synAndAntRef={synAndAntRef}
          />
        </div> */}
        <form
          ref={form}
          onSubmit={handleFormSubmit}
          className="flex justify-center gap-2 relative"
          action=""
        >
          <input
            className="border border-neutral-600/70 rounded-sm bg-neutral-800 pl-1 w-full"
            type="text"
            name="word"
            placeholder="Search..."
            required
          />

          <button
            className="bg-neutral-600/40 hover:bg-neutral-600 duration-200 px-1.5 rounded-sm"
            role="submit"
          >
            <IcRoundSearch />
          </button>
          {cleaner && (
            <button
              className="absolute h-full right-11"
              onClick={handleCleanResults}
            >
              <CleanIcon />
            </button>
          )}
        </form>
        <div className="mt-1 flex justify-end">
          {/* <p className="text-neutral-400 text-xs">
            {wordObject.length} Results
          </p> */}
          <SynAndAntToggle
            handleSynAndAntButton={handleSynAndAntButton}
            synAndAntBool={synAndAntBool}
            isSynAndAntActive={isSynAndAntActive}
            synAndAntRef={synAndAntRef}
          />
        </div>

        {isSynAndAntActive && (
          <SynAndAntCards
            synonyms={sanitizedSynAndAnt.synonyms}
            antonyms={sanitizedSynAndAnt.antonyms}
            setOnSynWord={setOnSynWord}
          />
        )}

        <section>
          {isLoading && <LoadingData />}
          {error && <ErrorMessage error={error} />}
          {data
            ? data && (
                <Fragment>
                  <div className="flex items-center flex-wrap gap-1.5 mb-3 mt-5">
                    <p className="text-3xl font-bold">{data?.word}</p>
                    <p className="text-neutral-400">
                      {data?.phonetics[0]?.text}
                    </p>
                    {/* <p className="text-neutral-400 text-xs">
                      {wordObject.length} Results
                    </p> */}
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
