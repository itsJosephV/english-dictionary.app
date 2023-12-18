import { WordSimilarTo } from "../types";

type Props = {
  dataWordSimilar: WordSimilarTo | null;
  setOnSimilarWords: (synItem: string | null) => void
}

const SimilarToCard: React.FC<Props> = ({
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
    dataWordSimilar.similarTo && (
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
