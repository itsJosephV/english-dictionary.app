import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";
import { WordResults } from "../types";
import DefWordButton from "./DefWordButton";
import { useState } from "react";

type Props = {
  item: WordResults;
};

const DefinitionCard: React.FC<Props> = ({ item }) => {
  const { isDetailsOpen } = useFunctionalityContext();
  const { fetchDictionary } = useDictionaryContext();

  const [onCopy, setOnCopy] = useState<boolean>(false);

  const handleCopyBtn = () => {
    setOnCopy(true);
    navigator.clipboard.writeText(item.definition)

    setTimeout(() => {
      setOnCopy(false);
    }, 2500);
  };

  return (
    <li className="mb-3 bg-neutral-800/50 p-3 rounded-sm last:mb-0 relative">
      <div className="absolute top-3 right-3 ">
        <button
          onClick={handleCopyBtn}
          className="flex items-center gap-0.5 text-xs  text-indigo-400 hover:text-indigo-300 duration-200"
        >
          {onCopy ? "copied!" : "copy definition"}
        </button>
      </div>
        <h1 className="inline-flex mb-2 text-sm text-neutral-400 border border-neutral-700 py-0.5 px-1 rounded-sm">
          {item.partOfSpeech ? item.partOfSpeech : "General"}
        </h1>
      <DefWordButton text={item.definition} />
      {(item.examples || item.synonyms || item.antonyms) && (
        <details open={isDetailsOpen}>
          <summary className="text-indigo-400 hover:text-indigo-300 duration-200">
            Details
          </summary>
          {item.examples && (
            <div className="flex flex-col mt-3">
              <p className="text-sm text-neutral-400 mb-0.5">Examples</p>
              <ul className="flex flex-col gap-1 text-neutral-500">
                {item.examples?.map((example, i) => (
                  <li key={i}>
                    <p className="text-sm">
                      {"•"} {example}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.synonyms && (
            <div className="flex flex-col mt-3">
              <p className="text-sm text-neutral-400 mb-2">Synonyms</p>
              <ul className="flex flex-wrap gap-2">
                {item.synonyms?.map((syn, idx) => (
                  <li
                    className="px-1.5 py-0.5 bg-purple-500/10 text-sm text-purple-300 hover:text-purple-200 duration-200 rounded-sm"
                    key={idx}
                  >
                    <button onClick={() => fetchDictionary(syn, false)}>
                      {syn}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.antonyms && (
            <div className="flex flex-col mt-3">
              <p className="text-sm text-neutral-400 mb-2">Antonyms</p>
              <ul className="flex flex-wrap gap-2">
                {item.antonyms?.map((ant, idx) => (
                  <li
                    className="px-1.5 py-0.5 bg-orange-500/10 text-sm rounded-sm text-orange-300 hover:text-orange-200 duration-200"
                    key={idx}
                  >
                    <button onClick={() => fetchDictionary(ant, false)}>
                      {ant}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </details>
      )}
    </li>
  );
};

export default DefinitionCard;
