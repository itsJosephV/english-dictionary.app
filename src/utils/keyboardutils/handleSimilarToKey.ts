export const handleSimilarToKey = (
  e: KeyboardEvent,
  similarToBool: boolean,
  similarToRef: React.RefObject<HTMLButtonElement>
) => {
  if (!similarToBool) {
    return;
  }
  if (e.shiftKey && e.key === "S") {
    e.preventDefault();
    console.log("Synonyms & Antonyms open");
    similarToRef.current?.click();
  }
};
