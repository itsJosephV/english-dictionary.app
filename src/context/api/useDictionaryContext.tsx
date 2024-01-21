import { useContext } from "react";
import { DictionaryDataContext } from "./DictionaryProvider";

export const useDictionaryContext = () => {
  const context = useContext(DictionaryDataContext);
  if (!context) {
    throw new Error("no context provided");
  }
  return context;
};
