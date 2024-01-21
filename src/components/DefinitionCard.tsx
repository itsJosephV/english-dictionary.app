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
        >
          {onCopy ? "copied!" : "copy definition"}
        </button>
      </div>
      <p className="mb-2 inline-flex rounded-sm border border-neutral-700 px-1 py-0.5 text-sm text-neutral-400">
        {item.partOfSpeech || "general"}
      </p>
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
                  <SynAntBtn
                    key={idx}
                    color={"purple"}
                    word={syn}
                    clean={false}
                    fetchDictionary={fetchDictionary}
                  />
                ))}
              </ul>
            </div>
          )}
          {item.antonyms && (
            <div className="mt-3 flex flex-col">
              <p className="mb-2 text-sm text-neutral-400">Antonyms</p>
              <ul className="flex flex-wrap gap-2">
                {item.antonyms?.map((ant, idx) => (
                  <SynAntBtn
                    key={idx}
                    color={"orange"}
                    word={ant}
                    clean={false}
                    fetchDictionary={fetchDictionary}
                  />
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

const SynAntBtn = ({
  color,
  word,
  clean,
  fetchDictionary,
}: {
  color: string;
  word: string;
  clean: boolean;
  fetchDictionary: (word: string, clean: boolean) => Promise<void>;
}) => {
  return (
    <li
      className={`rounded-sm bg-${color}-500/10 px-1.5 py-0.5 text-sm text-${color}-300 duration-200 hover:text-purple-200`}
    >
      <button onClick={() => fetchDictionary(word, clean)}>{word}</button>
    </li>
  );
};
