import { Fragment, useRef } from "react";
import Introduction from "./Introduction";
import ErrorMessage from "./ErrorMessage";
import DefinitionCard from "./DefinitionCard";
import { useHotkeys } from "react-hotkeys-hook";
import { LoadingData } from "../icons/LoadingData";
import { WordResults } from "../types";
import FavoriteButton from "./FavoriteButton";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";
import { CaretDown } from "../icons/CaretDown";
import { CaretUp } from "../icons/CaretUp";

const List = () => {
  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);

  const {
    dictionaryData,
    error,
    isLoading,
    storedWords,
    inputFlag,
    fetchDictionaryRandom,
    fetchDictionary,
    setDictionaryData,
  } = useDictionaryContext();
  const { resultsLimit, setResultsLimit } = useFunctionalityContext();

  const lastWordSearched = storedWords[storedWords.length - 2];

  useHotkeys(
    "shift+m",
    (e) => {
      e.preventDefault();

      if (
        !resultsLimit ||
        (dictionaryData?.results as Array<WordResults>).length < 5
      ) {
        return;
      }

      moreDataRef.current?.click();
      // console.log("more data");
    },
    { enableOnFormTags: ["INPUT"] },
  );

  useHotkeys(
    "shift+l",
    (e) => {
      e.preventDefault();
      if (resultsLimit === 5 || !dictionaryData) {
        return;
      }
      lessDataRef.current?.click();
      // console.log("less data");
    },
    { enableOnFormTags: ["INPUT"] },
  );

  return (
    <>
      {isLoading && <LoadingData />}
      {error && <ErrorMessage />}
      {!dictionaryData && !isLoading && !error && <Introduction />}
      {dictionaryData && (
        <Fragment>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <p className="min-w-0 break-words text-4xl font-medium">
              {dictionaryData.word}
            </p>
            {dictionaryData.pronunciation &&
              dictionaryData.pronunciation.all && (
                <span className="text-[1.2rem] text-neutral-400">{`—${" "}/${dictionaryData.pronunciation?.all}/`}</span>
              )}
          </div>
          <div className="mb-4">
            <FavoriteButton />
          </div>
          <div className="mb-2">
            {dictionaryData.results && dictionaryData.results.length ? (
              <p className="text-xs text-neutral-500 ">
                {dictionaryData.results.length}{" "}
                {`${
                  dictionaryData.results.length > 1 ? "Results" : "Result"
                } found`}
              </p>
            ) : (
              <>
                <p className="mb-6 break-words text-xs text-neutral-500">{`Results for '${dictionaryData.word}' are not available due to API limitations.`}</p>
                <div>
                  {storedWords.length === 1 && (
                    <button
                      className="text-sm text-indigo-400 duration-200 hover:text-indigo-300"
                      onClick={() => {
                        setDictionaryData(null);
                        fetchDictionaryRandom();
                      }}
                    >
                      {inputFlag ? "get a random word?" : "try random again"}
                    </button>
                  )}
                  {storedWords.length > 1 && (
                    <button
                      className="text-sm text-indigo-400 duration-200 hover:text-indigo-300"
                      onClick={() => {
                        fetchDictionary(lastWordSearched, false);
                      }}
                    >
                      back to previous word
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          {dictionaryData.results && (
            <ul>
              {dictionaryData.results
                .slice(
                  0,
                  resultsLimit ? resultsLimit : dictionaryData.results.length,
                )
                .map((item, i) => (
                  <DefinitionCard key={i} item={item} />
                ))}
            </ul>
          )}
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
    </>
  );
};

export default List;

const MoreAndLess = ({
  dataRef,
  dataValue,
  setResultsLimit,
}: {
  dataRef: React.RefObject<HTMLButtonElement>;
  dataValue: number | null;
  setResultsLimit: (dataValue: number | null) => void;
}) => {
  return (
    <button
      ref={dataRef}
      className="mt-2 flex items-center text-xs text-indigo-400 duration-200 hover:text-white"
      onClick={() => setResultsLimit(dataValue)}
      tabIndex={0}
    >
      {!dataValue ? "More results" : "Less results"}
      <span>
        {!dataValue ? (
          <CaretDown className="inline-flex" />
        ) : (
          <CaretUp className="inline-flex" />
        )}
      </span>
    </button>
  );
};
