import { useEffect, useRef, useState } from "react";
// Components
import DefinitionCard from "./components/DefinitionCard";
import LoadingData from "./components/LoadingData";
import ErrorMessage from "./components/ErrorMessage";
import Introduction from "./components/Introduction";
import InputAF from "./components/InputAF";
// Types
import { DictionaryItem } from "./types";
import { Definition } from "./types";
import { Meaning } from "./types";
import { SynAndAntItems } from "./types";

// ICONS
import { IcRoundSearch } from "./icons/SearchIcon";
import { CaretDown } from "./icons/CaretDown";
import { CaretUp } from "./icons/CaretUp";
import { CleanIcon } from "./icons/CleanIcon";

function App() {
  const [data, setData] = useState<DictionaryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [limit, setLimit] = useState<number | null>(5);
  const [cleaner, setCleaner] = useState<boolean>(false);
  const [autofocus, SetAutoFocus] = useState<boolean>(true);

  const form = useRef<HTMLFormElement>(null);
  const MoreData = useRef<HTMLButtonElement>(null);
  const LessData = useRef<HTMLButtonElement>(null);

  const fetchDictionary = async (word: string): Promise<void> => {
    const regex = /^[a-zA-Z\s][a-zA-Z\s]*$/;
    const spaceRegex = /^ *$/;

    if (spaceRegex.test(word)) {
      throw new Error("Spaces are allowed in the context, e.g., 'look after'.");
    }

    if (!regex.test(word)) {
      throw new Error("Word must contain only alphabets");
    }

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      throw new Error(`Word "${word}" was not found in the dictionary`);
    }
    const data = await response.json();
    setData(data[0]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setData(null);
    setError("");
    setLimit(5);
    const word = form.current?.word.value;
    if (word.length === 0) {
      return;
    }
    setLoading(true);
    try {
      await fetchDictionary(word);
      setError("");
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
      setCleaner(true);
    }
  };

  const wordObject: Definition[] =
    data?.meanings?.flatMap((meaning: Meaning) =>
      meaning.definitions.map((definition) => ({
        definition: definition.definition,
        example: definition.example,
        partOfSpeech: meaning.partOfSpeech,
      }))
    ) ?? [];

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
        synonyms: synAndAnt.synonyms?.filter(Boolean),
        antonyms: synAndAnt.antonyms?.filter(Boolean),
      }
    : {};

  // console.log(sanitizedSynAndAnt);

  const handleCleanResults = (e: React.FormEvent) => {
    e.preventDefault();
    form.current?.reset();
    setData(null);
    setError("");
    setLimit(null);
    setCleaner(false);
  };

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

  // console.log(data);

  // const isMac = navigator.userAgent.indexOf("Mac") != -1;
  // const isWin = navigator.userAgent.indexOf("Win") != -1;

  useEffect(() => {
    const handleWhipeKeys = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "C") {
        e.preventDefault();
        console.log("data whiped");
        form.current?.reset();
        setData(null);
        setError("");
        setLimit(null);
        setCleaner(false);
      }
    };
    document.addEventListener("keydown", handleWhipeKeys);

    return () => {
      document.removeEventListener("keydown", handleWhipeKeys);
    };
  }, []);

  useEffect(() => {
    const HandleMoreDataKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "M") {
        e.preventDefault();
        console.log("more data");
        MoreData.current?.click();
      }
    };
    document.addEventListener("keydown", HandleMoreDataKey);

    return () => {
      document.removeEventListener("keydown", HandleMoreDataKey);
    };
  }, []);

  useEffect(() => {
    const HandleLessDataKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "L") {
        e.preventDefault();
        console.log("less data");
        LessData.current?.click();
      }
    };
    document.addEventListener("keydown", HandleLessDataKey);

    return () => {
      document.removeEventListener("keydown", HandleLessDataKey);
    };
  }, []);

  return (
    <main className="min-h-screen mx-auto pb-3">
      <header className="mb-10 pt-14 border-b bg-neutral-900 border-neutral-600/60 pb-4">
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
            <div className="border border-neutral-700 p-1.5 rounded-sm inline-flex gap-3 items-center justify-between">
              <div className="flex gap-1">
                <span className="text-sm text-neutral-300">Clear</span>
                <kbd className="inline-flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700 font-medium text-white">
                  ⇧C
                </kbd>
              </div>
              <div className="flex gap-1">
                <span className="text-sm text-neutral-300">More/Less</span>
                <kbd className="inline-flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700 font-medium text-white">
                  ⇧M or L
                </kbd>
              </div>
            </div>
            <InputAF autofocus={autofocus} SetAutoFocus={SetAutoFocus} />
          </div>
        </div>
      </header>
      <article className="max-w-[850px] mx-auto px-5">
        <form
          ref={form}
          onSubmit={handleFormSubmit}
          className="flex justify-center gap-2 mb-3 relative"
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

        <div className="mb-4">
          {sanitizedSynAndAnt.synonyms &&
            sanitizedSynAndAnt.synonyms.length > 0 && (
              <div className="flex flex-col gap-1.5 mb-3">
                <p className="text-sm text-neutral-400">Synonyms</p>
                <ul className="flex flex-row gap-2 flex-wrap">
                  {sanitizedSynAndAnt.synonyms &&
                    sanitizedSynAndAnt.synonyms.map((el, i) => (
                      <li
                        className="bg-neutral-700 rounded-sm px-1.5 text-xs"
                        key={i}
                      >
                        {el}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          {sanitizedSynAndAnt.antonyms &&
            sanitizedSynAndAnt.antonyms.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <p className="text-sm text-neutral-400">Antonyms</p>
                <ul className="flex flex-row gap-2 flex-wrap">
                  {sanitizedSynAndAnt.antonyms &&
                    sanitizedSynAndAnt.antonyms.map((el, i) => (
                      <li
                        className="bg-neutral-700 rounded-sm px-1.5 text-xs"
                        key={i}
                      >
                        {el}
                      </li>
                    ))}
                </ul>
              </div>
            )}
        </div>

        <section>
          {loading && <LoadingData />}
          {error && <ErrorMessage error={error} />}
          {data
            ? data && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-3xl inline-flex font-bold">
                      {data?.word}
                      <span className="ml-3 text-[18px] font-normal text-neutral-400">
                        {data?.phonetics[0]?.text}
                      </span>
                    </p>
                    <p className="text-neutral-400">
                      {wordObject.length} Results
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
                        ref={MoreData}
                        className="flex items-center text-neutral-400 hover:text-white duration-200"
                        onClick={() => setLimit(null)}
                      >
                        More{" "}
                        <span>
                          <CaretDown />
                        </span>
                      </button>
                    ) : (
                      <button
                        ref={LessData}
                        className="flex items-center text-neutral-400 hover:text-white duration-200"
                        onClick={() => setLimit(5)}
                      >
                        Less{" "}
                        <span>
                          <CaretUp />
                        </span>
                      </button>
                    )
                  ) : null}
                </>
              )
            : !loading && !error && <Introduction />}
        </section>
      </article>
    </main>
  );
}

export default App;
