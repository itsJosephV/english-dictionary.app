import { useDictionaryContext } from "../context/api/useDictionaryContext";
import React from "react";

type Props = {
  text: string;
};

const DefWordButton: React.FC<Props> = ({ text }) => {
  const wordsWithSymbols = text.split(/\b(\w*['-]*\w+)\b/)
  const { fetchDictionary } = useDictionaryContext();

  return (
    <div className="select-none">
      {wordsWithSymbols.map((defWord, index) => {
        // Check if the word is a word character (\w+), then create a button
        if (/\w+/.test(defWord)) {
          return (
            <button
              className="cursor-pointer hover:underline underline-offset-[3px]"
              key={index}
              onClick={() => fetchDictionary(defWord, false)}
            >
              {defWord}
            </button>
          );
        } else {
          // If it's not a word character, render it outside the button
          return (
            <span key={index}>
              {defWord}
            </span>
          );
        }
      })}
    </div>
  );
};

export default DefWordButton;
