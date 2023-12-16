import { CaretDown } from "../icons/CaretDown";
import { CaretUp } from "../icons/CaretUp";

interface SynAndAntToggleProps {
  similarToBool: boolean;
  isSimilarWordsActive: boolean;
  handleSimilarToButton: () => void;
  similarToRef: React.RefObject<HTMLButtonElement>
}

const SimilarToToggle: React.FC<SynAndAntToggleProps> = ({
  similarToBool,
  isSimilarWordsActive,
  handleSimilarToButton,
  similarToRef
}) => {
  return (
    <button
      ref={similarToRef}
      onClick={handleSimilarToButton}
      className={`text-xs flex items-center gap-[1px] ${
        similarToBool ? "text-white hover:text-neutral-400 duration-200" : "text-neutral-500"
      }`}
      disabled={!similarToBool}
    >
      Similar words <span>{!isSimilarWordsActive ? <CaretDown /> : <CaretUp />}</span>
    </button>
  );
};

export default SimilarToToggle;
