import { CaretDown } from "../icons/CaretDown";
import { CaretUp } from "../icons/CaretUp";

interface MoreAndLessProps {
  dataRef: React.RefObject<HTMLButtonElement>;
  dataValue: number | null;
  setLimit: React.Dispatch<React.SetStateAction<number | null>>;
}

export const MoreAndLess: React.FC<MoreAndLessProps> = ({
  dataRef,
  dataValue,
  setLimit,
}) => {
  return (
    <button
      ref={dataRef}
      className="flex items-center text-xs text-white hover:text-neutral-400 duration-200 mt-2"
      onClick={() => setLimit(dataValue)}
    >
      {!dataValue ? "More results" : "Less results"}
      <span>
        {!dataValue ? (
          <CaretDown className="inline-flex" />
        ) : (
          <CaretUp className="inline-flex" />
        )}
      </span>
    </button>
  );
};
