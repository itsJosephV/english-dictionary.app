import { useContext } from "react";
import { FunctionalityContext } from "./FunctionalityProvider";

export const useFunctionalityContext = () => {
  const context = useContext(FunctionalityContext);
  if (!context) {
    throw new Error("no context provided");
  }
  return context;
};
