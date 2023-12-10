import { DictionaryItem } from "../../types";

export const handleLessDataKey = (
  e: KeyboardEvent,
  limit: number | null,
  data: DictionaryItem | null,
  lessDataRef: React.RefObject<HTMLButtonElement>
) => {
  if (limit === 5 || !data) {
    return;
  }

  if (e.shiftKey && e.key === "L") {
    e.preventDefault();
    console.log("less data");
    lessDataRef.current?.click();
  }
};
