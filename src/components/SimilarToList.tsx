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
    { enableOnFormTags: ["INPUT"] },
  );

  return (
    <details
      ref={similarToRef}
      open={isSimilarWordsActive}
      onToggle={handleSimilarToButton}
    >
      <summary
        className={`mt-1 text-xs ${
          similarToBool
            ? "text-indigo-400 duration-200 hover:text-indigo-300"
            : "pointer-events-none select-none text-neutral-500"
        }`}
      >
        Similar words
      </summary>
      <ul className="mt-4 flex flex-row flex-wrap gap-2">
        {similarToData?.similarTo?.map((simItem) => (
          <li
            className="rounded-sm bg-indigo-500/10 px-1.5 py-0.5 text-sm text-indigo-300 duration-200 hover:text-indigo-200"
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
