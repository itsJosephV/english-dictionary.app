// import { FavoriteWordsContextProps } from "@/types";
import { useContext } from "react";
import { DictionaryDataContext } from "./DictionaryContext";

export const useDictionaryContext = () => {
  const context = useContext(DictionaryDataContext);
  if (!context) {
    throw new Error("no context provided");
  }
  return context;
};