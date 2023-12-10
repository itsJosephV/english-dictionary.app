export const handleSynAndAntKey = (
  e: KeyboardEvent,
  synAndAntBool: boolean,
  synAndAntRef: React.RefObject<HTMLButtonElement>
) => {
  if (!synAndAntBool) {
    return;
  }
  if (e.shiftKey && e.key === "S") {
    e.preventDefault();
    console.log("Synonyms & Antonyms open");
    synAndAntRef.current?.click();
  }
};
