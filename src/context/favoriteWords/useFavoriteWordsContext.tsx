// import { FavoriteWordsContextProps } from "@/types";
import { useContext } from "react";
import { FavoriteWordsContext } from "./FavoriteWordsProvider";

export const useFavoriteWords = () => {
  const context = useContext(FavoriteWordsContext);
  if (!context) {
    throw new Error("no context provided");
  }
  return context;
};
