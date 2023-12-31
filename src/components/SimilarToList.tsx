import SimilarToCard from "./SimilarToCard";
import { WordSimilarTo } from "../types";
import { SetStateAction, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  similarToBool: boolean;
  isSimilarWordsActive: boolean;
  similarToData: WordSimilarTo | null;
  setOnSimilarToWords: React.Dispatch<SetStateAction<string | null>>;
  handleSimilarToButton: (e: React.ChangeEvent<HTMLDetailsElement>) => void;
};

const SimilarToList: React.FC<Props> = ({
  similarToBool,
  isSimilarWordsActive,
  similarToData,
  setOnSimilarToWords,
  handleSimilarToButton,
}) => {
  const similarToRef = useRef<HTMLDetailsElement>(null);

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
