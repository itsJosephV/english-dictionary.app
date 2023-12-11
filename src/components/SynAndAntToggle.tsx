
import { CaretDown } from "../icons/CaretDown";
import { CaretUp } from "../icons/CaretUp";

interface SynAndAntToggleProps {
  synAndAntBool: boolean;
  isSynAndAntActive: boolean;
  handleSynAndAntButton: () => void;
  synAndAntRef: React.RefObject<HTMLButtonElement>
}

const SynAndAntToggle: React.FC<SynAndAntToggleProps> = ({
  synAndAntBool,
  isSynAndAntActive,
  handleSynAndAntButton,
  synAndAntRef
}) => {
  return (
    <button
      ref={synAndAntRef}
      onClick={handleSynAndAntButton}
      className={`text-xs flex items-center gap-[1px] ${
        synAndAntBool ? "text-teal-600 hover:text-teal-400 duration-200" : "text-neutral-500"
      }`}
      disabled={!synAndAntBool}
    >
      Synonyms / Antonysm <span>{!isSynAndAntActive ? <CaretDown /> : <CaretUp />}</span>
    </button>
  );
};

export default SynAndAntToggle;
