import { WordSimilarTo } from "../types";

interface SimilarToWordsProps {
  dataWordSimilar: WordSimilarTo | null;
  setOnSimilarWords: React.Dispatch<React.SetStateAction<string | null>>;
}

const SimilarToCard: React.FC<SimilarToWordsProps> = ({
  dataWordSimilar,
  setOnSimilarWords,
}) => {
  const handleSimilarToButton = (synItem: string) => {
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
          <li
            className="px-1.5 bg-neutral-800 border border-neutral-700/50 hover:border-neutral-600 text-sm text-neutral-300 hover:text-white duration-200 rounded-sm"
            key={i}
          >
            <button onClick={() => handleSimilarToButton(simItem)}>
              {simItem}
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

export default SimilarToCard;
