import { Fragment, useEffect, useRef } from "react";
// import { useFetchDictionary } from "../utils/data/useFetchDictionary";
import Introduction from "./Introduction";
import ErrorMessage from "./ErrorMessage";
import DefinitionCard from "./DefinitionCard";
import { MoreAndLess } from "./MoreAndLess";
import { useHotkeys } from "react-hotkeys-hook";
import { DictionaryItem } from "../types";
import { LoadingData } from "../icons/LoadingData";
import { WordResults } from "../types";

type Props = {
  resultsLimit: number | null;
  setOnSynAntWords: React.Dispatch<React.SetStateAction<string | null>>;
  setResultsLimit: React.Dispatch<React.SetStateAction<number | null>>;
  dictionaryData: DictionaryItem | null;
  fetchDictionaryRandom: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const List: React.FC<Props> = ({
  resultsLimit,
  setOnSynAntWords,
  setResultsLimit,
  dictionaryData,
  fetchDictionaryRandom,
  isLoading,
  error,
}) => {
  //? custom hook not working when refactoring this way
  //! const { isLoading, error, fetchDictionaryRandom, dictionaryData } =
  //!   useFetchDictionary();

  const moreDataRef = useRef<HTMLButtonElement>(null);
  const lessDataRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (dictionaryData) {
      console.log("dictionaryData:", dictionaryData);
    } else {
      console.log("no data");
    }
  }, [dictionaryData]);

  return (
    <section>
      {isLoading && <LoadingData />}
      {error && <ErrorMessage error={error} />}
      {!dictionaryData && !isLoading && !error && (
        <Introduction fetchDictionaryRandom={fetchDictionaryRandom} />
      )}
      {dictionaryData && (
        <Fragment>
          <div className="flex items-center flex-wrap mb-2 mt-7">
            <p className="text-3xl font-semibold mr-2">
              {dictionaryData.word}
              {"  "}
              {dictionaryData.pronunciation &&
                dictionaryData.pronunciation.all && (
                  <span className="text-[1.2rem] text-neutral-400">{`/${dictionaryData.pronunciation?.all}/`}</span>
                )}
            </p>
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
              <p className="text-neutral-500 text-xs">{`Results for '${dictionaryData.word}' are not available due to API limitations.`}</p>
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
                  <DefinitionCard
                    key={i}
                    item={item}
                    setOnSynAntWords={setOnSynAntWords}
                  />
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
    </section>
  );
};

export default List;
