// import { FavoriteWordsContextProps } from "@/types";
import { useContext } from "react";
import { FavoriteWordsContext } from "./FavoriteWordsContext";

export const useFavoriteWords = () => {
  const context = useContext(FavoriteWordsContext);
  if (!context) {
    throw new Error("no context provided");
  }
  return context;
};
