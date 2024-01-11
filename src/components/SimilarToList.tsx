import SimilarToCard from "./SimilarToCard";
import { SetStateAction, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDictionaryContext } from "../context/api/useDictionaryContext";

type Props = {
  isSimilarWordsActive: boolean;
  setOnSimilarToWords: React.Dispatch<SetStateAction<string | null>>;
  handleSimilarToButton: (e: React.ChangeEvent<HTMLDetailsElement>) => void;
};

const SimilarToList: React.FC<Props> = ({
  isSimilarWordsActive,
  setOnSimilarToWords,
  handleSimilarToButton,
}) => {
  const similarToRef = useRef<HTMLDetailsElement>(null);
  const { similarToData } = useDictionaryContext();
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
