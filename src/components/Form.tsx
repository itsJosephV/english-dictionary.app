import { IcRoundSearch } from "../icons/SearchIcon";
import { CleanIcon } from "../icons/CleanIcon";
import { BackIcon } from "../icons/BackIcon";
import { useHotkeys } from "react-hotkeys-hook";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useRef } from "react";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

const Form = () => {
  const { dictionaryData, isReseteableEn } = useDictionaryContext();
  const {
    form,
    word,
    isClearEn,
    handleFormSubmit,
    handleCleanResults,
    setWord,
    handleBackToFirst,
  } = useFunctionalityContext();
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const formBool: boolean = Boolean(word?.length);

  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(word || "");
  };

  useHotkeys(
    "shift+c",
    (e) => {
      e.preventDefault();

      if (!dictionaryData && !formBool) {
        return;
      }
      clearButtonRef.current?.click();
    },
    { enableOnFormTags: ["INPUT"] },
  );

  useHotkeys(
    "shift+r",
    (e) => {
      e.preventDefault();
      if (!dictionaryData || !isReseteableEn) {
        return;
      }
      resetButtonRef.current?.click();
    },
    { enableOnFormTags: ["INPUT"] },
  );

  return (
    <form
      ref={form}
      onSubmit={handleWordSubmit}
      className="flex justify-center gap-1"
      action=""
    >
      <div className="relative w-full">
        <input
          className="w-full rounded-sm border border-neutral-700 bg-transparent py-0.5 pl-1.5 pr-8"
          type="text"
          name="word"
          placeholder="Search"
          required
          autoCapitalize="none"
          autoCorrect="none"
          onChange={(e) => setWord(e.target.value)}
          value={word || ""}
        />
        {isClearEn && (
          <button
            type="button"
            ref={clearButtonRef}
            className="absolute right-2 h-full"
            onClick={handleCleanResults}
          >
            <CleanIcon className="text-neutral-400 duration-200 hover:text-white" />
          </button>
        )}
      </div>
      {isReseteableEn && (
        <button
          className="flex h-[30px] w-[32px] items-center justify-center rounded-sm border border-neutral-700 bg-transparent text-neutral-400 duration-200 hover:text-white"
          type="button"
          onClick={handleBackToFirst}
          ref={resetButtonRef}
        >
          <BackIcon />
        </button>
      )}
      <button
        className="flex h-[30px] w-[32px] items-center justify-center rounded-sm border border-neutral-700 bg-transparent text-neutral-400 duration-200 hover:text-white"
        type="submit"
      >
        <IcRoundSearch />
      </button>
    </form>
  );
};

export default Form;
