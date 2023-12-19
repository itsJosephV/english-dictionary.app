import { BackIcon } from "../icons/BackIcon";

type Props = {
  handleBackToFirst: () => void;
}

const RestartButton: React.FC<Props> = ({ handleBackToFirst }) => {
  return (
    <button onClick={handleBackToFirst} className="text-xs text-indigo-300 hover:text-indigo-200 duration-200">
      <span className="flex items-center gap-0.5">
        <BackIcon />
        Restart
      </span>
    </button>
  );
};

export default RestartButton;
