import { Definition } from "../../types";

export const handleMoreDataKey = (
  e: KeyboardEvent,
  limit: number | null,
  wordObject: Definition[],
  moreDataRef: React.RefObject<HTMLButtonElement>
) => {
  if (limit === null || wordObject.length < 5) {
    return;
  }
  if (e.shiftKey && e.key === "M") {
    e.preventDefault();
    console.log("more data");
    moreDataRef.current?.click();
  }
};
