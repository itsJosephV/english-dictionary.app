
import { CaretDown } from "../icons/CaretDown";
import { CaretUp } from "../icons/CaretUp";

interface SynAndAntToggleProps {
  synAndAntData: boolean;
  isSynAndAntActive: boolean
  handleSynAndAntButton: () => void;
}

const SynAndAntToggle: React.FC<SynAndAntToggleProps> = ({
  synAndAntData,
  isSynAndAntActive,
  handleSynAndAntButton,
}) => {
  return (
    <button
      onClick={handleSynAndAntButton}
      className={`text-xs flex items-center gap-[2px] ${
        synAndAntData ? "text-teal-600" : "text-neutral-500"
      }`}
      disabled={!synAndAntData}
    >
      Synonyms / Antonysm <span>{!isSynAndAntActive ? <CaretDown /> : <CaretUp />}</span>
    </button>
  );
};

export default SynAndAntToggle;
