import { DictionaryItem } from "../../types"

export const handleMoreDataKey = (
  e: KeyboardEvent,
  limit: number | null,
  wordResults: DictionaryItem,
  moreDataRef: React.RefObject<HTMLButtonElement>
) => {
  if (limit === null || wordResults.results.length < 5) {
    return;
  }
  if (e.shiftKey && e.key === "M") {
    e.preventDefault();
    console.log("more data");
    moreDataRef.current?.click();
  }
};
