import SimilarToBtn from "./SimilarToBtn";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

const SimilarToList = () => {
  const similarToRef = useRef<HTMLDetailsElement>(null);
  const { similarToData } = useDictionaryContext();
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
      className={`text-xs flex items-center ${
        similarToBool
          ? "text-indigo-300 hover:text-indigo-200 duration-200"
          : "text-neutral-500 select-none pointer-events-none"
      }`}
      ref={similarToRef}
      open={isSimilarWordsActive}
      onToggle={handleSimilarToButton}
    >
      <summary className="mt-1"> Similar words</summary>
      <ul className="flex flex-row mt-4 gap-2 flex-wrap">
        {similarToData?.similarTo?.map((simItem, idx) => (
          <li
            className="px-1.5 py-0.5 bg-neutral-800/50 border border-neutral-700 text-sm text-neutral-300 hover:text-white duration-200 rounded-md"
            key={idx}
          >
            <SimilarToBtn simItem={simItem} />
          </li>
        ))}
      </ul>
    </details>
  );
};

export default SimilarToList;
