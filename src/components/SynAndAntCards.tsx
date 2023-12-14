interface SanitizedSynAndAnt {
  synonyms?: string[];
  antonyms?: string[];
  setOnSynWord: React.Dispatch<React.SetStateAction<string | null>>;
}

const SynAndAntCards: React.FC<SanitizedSynAndAnt> = ({
  synonyms,
  antonyms,
  setOnSynWord,
}) => {
  const handleSynAntButton = (synItem: string) => {
    if (synItem) {
      setOnSynWord(synItem);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      {synonyms && synonyms.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-neutral-400">Synonyms</p>
          <ul className="flex flex-row gap-2 flex-wrap">
            {synonyms &&
              synonyms.map((synItem, i) => (
                <li
                  className="bg-neutral-700 rounded-sm px-1.5 text-xs"
                  key={i}
                >
                  <button onClick={() => handleSynAntButton(synItem)}>
                    {synItem}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
      {antonyms && antonyms.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-neutral-400">Antonyms</p>
          <ul className="flex flex-row gap-2 flex-wrap">
            {antonyms &&
              antonyms.map((antItem, i) => (
                <li
                  className="bg-neutral-700 rounded-sm px-1.5 text-xs"
                  key={i}
                >
                  <button onClick={() => handleSynAntButton(antItem)}>
                    {antItem}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SynAndAntCards;
