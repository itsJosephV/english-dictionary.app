import React from "react";
import { IcRoundSearch } from "../icons/SearchIcon";
import { CleanIcon } from "../icons/CleanIcon";

interface FormProps {
  form: React.RefObject<HTMLFormElement>;
  cleaner: boolean;
  clearButtonRef: React.RefObject<HTMLButtonElement>;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  handleCleanResults: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({
  form,
  cleaner,
  clearButtonRef,
  handleFormSubmit,
  handleCleanResults,
}) => {
  return (
    <form
      ref={form}
      onSubmit={handleFormSubmit}
      className="flex justify-center gap-2 relative"
      action=""
    >
      <input
        className="border border-neutral-600/70 rounded-sm bg-neutral-800 pl-1 w-full"
        type="text"
        name="word"
        placeholder="Search..."
        required
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
          <CleanIcon />
        </button>
      )}
    </form>
  );
};

export default Form;