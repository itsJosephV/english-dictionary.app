import { Fragment, useRef } from "react";
import Introduction from "./Introduction";
import ErrorMessage from "./ErrorMessage";
import DefinitionCard from "./DefinitionCard";
import { MoreAndLess } from "./MoreAndLess";
import { useHotkeys } from "react-hotkeys-hook";
import { LoadingData } from "../icons/LoadingData";
import { WordResults } from "../types";
import FavoriteButton from "./FavoriteButton";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

const List = () => {
  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);

  const { dictionaryData, error, isLoading } = useDictionaryContext();
  const { resultsLimit, setResultsLimit } = useFunctionalityContext();

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

  return (
    <>
      {isLoading && <LoadingData />}
      {error && <ErrorMessage />}
      {!dictionaryData && !isLoading && !error && <Introduction />}
      {dictionaryData && (
        <Fragment>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <p className="text-4xl font-semibold overflow-hidden break-words">
              {dictionaryData.word}
            </p>
            {dictionaryData.pronunciation &&
              dictionaryData.pronunciation.all && (
                <span className="text-[1.2rem] text-neutral-400">{`—${" "}/${
                  dictionaryData.pronunciation?.all
                }/`}</span>
              )}
          </div>
          <div className="mb-4">
            <FavoriteButton />
          </div>
          <div className="mb-2">
            {dictionaryData.results && dictionaryData.results.length ? (
              <p className="text-neutral-500 text-xs ">
                {dictionaryData.results.length}{" "}
                {`${
                  dictionaryData.results.length > 1 ? "Results" : "Result"
                } found`}
              </p>
            ) : (
              <p className="text-neutral-500 text-xs break-words">{`Results for '${dictionaryData.word}' are not available due to API limitations.`}</p>
            )}
          </div>
          {dictionaryData.results && (
            <ul>
              {dictionaryData.results
                .slice(
                  0,
                  resultsLimit ? resultsLimit : dictionaryData.results.length
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
