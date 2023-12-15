import { DictionaryItem } from "../../types"

export const handleLessDataKey = (
  e: KeyboardEvent,
  limit: number | null,
  dataDictionary: DictionaryItem | null,
  lessDataRef: React.RefObject<HTMLButtonElement>
) => {
  if (limit === 5 || !dataDictionary) {
    return;
  }

  if (e.shiftKey && e.key === "L") {
    e.preventDefault();
    console.log("less data");
    lessDataRef.current?.click();
  }
};