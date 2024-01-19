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
    { enableOnFormTags: ["INPUT"] }
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
    { enableOnFormTags: ["INPUT"] }
  );

  return (
    <form
      ref={form}
      onSubmit={handleWordSubmit}
      className="flex justify-center gap-1"
      action=""
    >
      <div className="w-full relative">
        <input
          className="border border-neutral-700 rounded-sm bg-transparent py-0.5 pl-1.5 pr-8 w-full"
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
            className="absolute h-full right-2"
            onClick={handleCleanResults}
          >
            <CleanIcon className="text-neutral-400 hover:text-white duration-200" />
          </button>
        )}
      </div>
      {isReseteableEn && (
        <button
          className="flex items-center justify-center bg-transparent border border-neutral-700 duration-200 w-[32px] h-[30px] text-neutral-400 hover:text-white rounded-sm"
          type="button"
          onClick={handleBackToFirst}
          ref={resetButtonRef}
        >
          <BackIcon />
        </button>
      )}
      <button
        className="flex items-center justify-center border border-neutral-700 duration-200 w-[32px] h-[30px] hover:text-white text-neutral-400 rounded-sm bg-transparent" 
        type="submit"
      >
        <IcRoundSearch />
      </button>
    </form>
  );
};

export default Form;
