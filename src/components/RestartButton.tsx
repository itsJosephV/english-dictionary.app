import { BackIcon } from "../icons/BackIcon";

type Props = {
  handleBackToFirst: () => void;
}

const RestartButton: React.FC<Props> = ({ handleBackToFirst }) => {
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
