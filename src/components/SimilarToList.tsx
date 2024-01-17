import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

const SimilarToList = () => {
  const similarToRef = useRef<HTMLDetailsElement>(null);
  const { similarToData, fetchDictionary } = useDictionaryContext();
  const { isSimilarWordsActive, handleSimilarToButton } =
    useFunctionalityContext();
  const similarToBool: boolean = Boolean(similarToData?.similarTo?.length);

  useHotkeys(
    "shift+s",
    (e) => {
      e.preventDefault();
      if (!similarToBool) {
        return;
      }

      if (similarToRef.current) {
        similarToRef.current.open = !similarToRef.current.open;
      }
    },
    { enableOnFormTags: ["INPUT"] }
  );

  return (
    <details
      ref={similarToRef}
      open={isSimilarWordsActive}
      onToggle={handleSimilarToButton}
    >
      <summary
        className={`text-xs mt-1 ${
          similarToBool
            ? "text-indigo-400 hover:text-white duration-200"
            : "text-neutral-500 select-none pointer-events-none"
        }`}
      >
        Similar words
      </summary>
      <ul className="flex flex-row mt-4 gap-2 flex-wrap">
        {similarToData?.similarTo?.map((simItem) => (
          <li
            className="px-1.5 py-0.5 bg-indigo-500/10 text-sm text-indigo-300 hover:text-indigo-200 duration-200 rounded-sm"
            key={simItem}
          >
            <button onClick={() => fetchDictionary(simItem, false)}>
              {simItem}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default SimilarToList;
