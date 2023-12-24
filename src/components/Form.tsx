import React from "react";
import { IcRoundSearch } from "../icons/SearchIcon";
import { CleanIcon } from "../icons/CleanIcon";
// import { useFetchDictionary } from "../utils/data/useFetchDictionary";

type Props = {
  form: React.RefObject<HTMLFormElement>;
  handleFormSubmit: (word: string) => Promise<void>;
  cleaner: boolean;
  clearButtonRef: React.RefObject<HTMLButtonElement>;
  handleCleanResults: (e: React.FormEvent) => void;
};

const Form: React.FC<Props> = ({
  form,
  cleaner,
  clearButtonRef,
  handleFormSubmit,
  handleCleanResults,
}) => {

  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(form.current?.word.value || "");
  };

  return (
    <form
      ref={form}
      onSubmit={handleWordSubmit}
      className="flex justify-center gap-2 relative"
      action=""
    >
      <input
        className="border border-neutral-700 rounded-sm bg-neutral-800 pl-1 w-full"
        type="text"
        name="word"
        placeholder="Search..."
        required
        autoCapitalize="none"
        autoCorrect="none"
      />

      <button
        className="bg-neutral-600/40 hover:bg-neutral-600 duration-200 px-1.5 rounded-sm"
        role="submit"
      >
        <IcRoundSearch />
      </button>
      {cleaner && (
        <button
          ref={clearButtonRef}
          className="absolute h-full right-11"
          onClick={handleCleanResults}
        >
          <CleanIcon className="text-neutral-300 hover:text-white duration-200" />
        </button>
      )}
    </form>
  );
};

export default Form;
