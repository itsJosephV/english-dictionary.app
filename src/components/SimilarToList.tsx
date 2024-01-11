import SimilarToCard from "./SimilarToCard";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

const SimilarToList = () => {
  const similarToRef = useRef<HTMLDetailsElement>(null);
  const { similarToData } = useDictionaryContext();
  const { isSimilarWordsActive, setOnSimilarToWords, handleSimilarToButton } =
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
      <SimilarToCard
        similarToData={similarToData}
        setOnSimilarToWords={setOnSimilarToWords}
      />
    </details>
  );
};

export default SimilarToList;
