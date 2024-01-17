import { CaretDown } from "../icons/CaretDown";
import { CaretUp } from "../icons/CaretUp";

type Props = {
  dataRef: React.RefObject<HTMLButtonElement>;
  dataValue: number | null;
  setResultsLimit: (dataValue: number | null) => void;
}

export const MoreAndLess: React.FC<Props> = ({
  dataRef,
  dataValue,
  setResultsLimit,
}) => {
  return (
    <button
      ref={dataRef}
      className="flex items-center text-xs text-indigo-400 hover:text-white duration-200 mt-2"
      onClick={() => setResultsLimit(dataValue)}
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
