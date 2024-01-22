import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";
import { WordResults } from "../types";
import DefWordButton from "./DefWordButton";
import { useState } from "react";

type Props = {
  item: WordResults;
};

const DefinitionCard: React.FC<Props> = ({ item }) => {
  const { settings } = useFunctionalityContext();
  const { fetchDictionary, dictionaryData } = useDictionaryContext();

  const [onCopy, setOnCopy] = useState<boolean>(false);

  const handleCopyBtn = () => {
    setOnCopy(true);
    navigator.clipboard.writeText(
      `${dictionaryData?.word}(${item.partOfSpeech || "general"}): ${
        item.definition
      }`,
    );

    setTimeout(() => {
      setOnCopy(false);
    }, 2500);
  };

  return (
    <li className="relative mb-3 rounded-sm bg-neutral-800/50 p-3 last:mb-0">
      <div className="absolute right-3 top-3 ">
        <button
          onClick={handleCopyBtn}
          className="flex items-center gap-0.5 text-xs  text-indigo-400 duration-200 hover:text-indigo-300"
          tabIndex={0}
        >
          {onCopy ? "copied!" : "copy definition"}
        </button>
      </div>
      <h1 className="mb-2 inline-flex rounded-sm border border-neutral-700 px-1 py-0.5 text-sm text-neutral-400">
        {item.partOfSpeech || "general"}
      </h1>
      <DefWordButton text={item.definition} />
      {(item.examples || item.synonyms || item.antonyms) && (
        <details open={settings.details}>
          <summary className="text-indigo-400 duration-200 hover:text-indigo-300">
            Details
          </summary>
          {item.examples && (
            <div className="mt-3 flex flex-col">
              <p className="mb-0.5 text-sm text-neutral-400">Examples</p>
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
            <div className="mt-3 flex flex-col">
              <p className="mb-2 text-sm text-neutral-400">Synonyms</p>
              <ul className="flex flex-wrap gap-2">
                {item.synonyms?.map((syn, idx) => (
                  <li
                    className="rounded-sm bg-purple-500/10 px-1.5 py-0.5 text-sm text-purple-300 duration-200 hover:text-purple-200"
                    key={idx}
                  >
                    <button onClick={() => fetchDictionary(syn, false)}>
                      {syn}
                    </button>
                  </li>
                  // <SynAntBtn key={idx} color={"purple"} syn={syn} clean={false} fetchDictionary={fetchDictionary} />
                ))}
              </ul>
            </div>
          )}
          {item.antonyms && (
            <div className="mt-3 flex flex-col">
              <p className="mb-2 text-sm text-neutral-400">Antonyms</p>
              <ul className="flex flex-wrap gap-2">
                {item.antonyms?.map((ant, idx) => (
                  <li
                    className="rounded-sm bg-orange-500/10 px-1.5 py-0.5 text-sm text-orange-300 duration-200 hover:text-orange-200"
                    key={idx}
                  >
                    <button onClick={() => fetchDictionary(ant, false)}>
                      {ant}
                    </button>
                  </li>
                  // <SynAntBtn key={idx} color={"purple"} syn={ant} clean={false} fetchDictionary={fetchDictionary} />
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

//! 'color' tw classes not working when app is deployed
// const SynAntBtn = ({
//   color,
//   syn,
//   clean,
//   fetchDictionary,
// }: {
//   color: string;
//   syn: string;
//   clean: boolean;
//   fetchDictionary: (syn: string, clean: boolean) => Promise<void>;
// }) => {
//   return (
//     <li
//       className={`rounded-sm bg-${color}-500/10 px-1.5 py-0.5 text-sm text-${color}-300 duration-200 hover:text-purple-200`}
//     >
//       <button onClick={() => fetchDictionary(syn, clean)}>{syn}</button>
//     </li>
//   );
// };
