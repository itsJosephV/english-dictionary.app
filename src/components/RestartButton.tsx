import { BackIcon } from "../icons/BackIcon";

interface RestartButtonProps {
  handleBackToFirst: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ handleBackToFirst }) => {
  return (
    <button onClick={handleBackToFirst} className="text-xs text-rose-400 hover:text-rose-200 duration-200">
      <span className="flex items-center gap-0.5">
        <BackIcon />
        Restart
      </span>
    </button>
  );
};

export default RestartButton;
