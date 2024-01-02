import { IcRoundSearch } from "../icons/SearchIcon";
import { CleanIcon } from "../icons/CleanIcon";
import { BackIcon } from "../icons/BackIcon";

type Props = {
  form: React.RefObject<HTMLFormElement>;
  word: string | null;
  cleaner: boolean;
  clearButtonRef: React.RefObject<HTMLButtonElement>;
  handleFormSubmit: (word: string) => Promise<void>;
  handleCleanResults: (e: React.FormEvent) => void;
  setWord: React.Dispatch<React.SetStateAction<string | null>>;
  handleBackToFirst: () => void;
  isReseteableEn: boolean;
};

const Form: React.FC<Props> = ({
  form,
  word,
  cleaner,
  clearButtonRef,
  handleFormSubmit,
  handleCleanResults,
  setWord,
  handleBackToFirst,
  isReseteableEn,
}) => {
  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(word || "");
  };

  return (
    <form
      ref={form}
      onSubmit={handleWordSubmit}
      className="flex justify-center gap-1"
      action=""
    >
      <div className="w-full relative">
        <input
          className="border border-neutral-700 rounded-md bg-neutral-800/50 py-0.5 pl-1.5 pr-8 w-full"
          type="text"
          name="word"
          placeholder="Search..."
          required
          autoCapitalize="none"
          autoCorrect="none"
          onChange={(e) => setWord(e.target.value)}
          value={word || ""}
        />
        {cleaner && (
          <button
            type="button"
            ref={clearButtonRef}
            className="absolute h-full right-2"
            onClick={handleCleanResults}
          >
            <CleanIcon className="text-neutral-300 hover:text-white duration-200" />
          </button>
        )}
      </div>
      {isReseteableEn && (
        <button
          className="bg-indigo-800/30 border border-indigo-300/30 duration-200 w-[32px] h-[30px] hover:text-indigo-200 text-indigo-300 rounded-md flex items-center justify-center"
          type="button"
          onClick={handleBackToFirst}
        >
          <BackIcon />
        </button>
      )}
      <button
        className="flex items-center justify-center bg-neutral-800/50 border border-neutral-700 duration-200 w-[32px] h-[30px] hover:text-white rounded-md"
        type="submit"
      >
        <IcRoundSearch />
      </button>
    </form>
  );
};

export default Form;
