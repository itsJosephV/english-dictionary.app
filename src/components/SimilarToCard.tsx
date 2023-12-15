import { WordSimilarTo } from "../types";

interface SimilarToWordsProps {
  dataWordSimilar: WordSimilarTo | null;
  setOnSimilarWords: React.Dispatch<React.SetStateAction<string | null>>;
}

const SimilarToCard: React.FC<SimilarToWordsProps> = ({
  dataWordSimilar,
  setOnSimilarWords,
}) => {
  const handleSynAntButton = (synItem: string) => {
    if (synItem) {
      setOnSimilarWords(synItem);
    }
  };
  return (
    dataWordSimilar &&
    dataWordSimilar.similarTo &&
    dataWordSimilar.similarTo.length > 0 && (
      <ul className="flex flex-row mt-4 gap-2 flex-wrap">
        {dataWordSimilar.similarTo.map((simItem, i) => (
          <li className="bg-neutral-700 rounded-sm px-1.5 text-xs" key={i}>
            <button onClick={() => handleSynAntButton(simItem)}>
              {simItem}
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

export default SimilarToCard;
