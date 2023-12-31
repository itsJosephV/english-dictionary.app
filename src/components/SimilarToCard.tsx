import { WordSimilarTo } from "../types";

type Props = {
  similarToData: WordSimilarTo | null;
  setOnSimilarToWords: (synItem: string | null) => void
}

const SimilarToCard: React.FC<Props> = ({
  similarToData,
  setOnSimilarToWords,
}) => {
  const handleSimilarToButton = (synItem: string) => {
    if (synItem) {
      setOnSimilarToWords(synItem);
    }
  };
  return (
    similarToData &&
    similarToData.similarTo && (
      <ul className="flex flex-row mt-4 gap-2 flex-wrap">
        {similarToData.similarTo.map((simItem, i) => (
          <li
            className="px-1.5 py-0.5 bg-neutral-800/50 border border-neutral-700 text-sm text-neutral-300 hover:text-white duration-200 rounded-md"
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
