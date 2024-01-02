import { DictionaryItem } from "../types";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWords";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { NoFavoriteIcon } from "../icons/NoFavoriteIcon";

type Props = {
  dictionaryData: DictionaryItem | null;
};

const FavoriteButton: React.FC<Props> = ({ dictionaryData }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteWords();

  const isFavorite =
    dictionaryData?.word !== undefined &&
    favorites.includes(dictionaryData?.word);

  const handleToggleFavorite = () => {
    if (!dictionaryData?.word) {
      return;
    }

    if (isFavorite) {
      removeFavorite(dictionaryData?.word);
    } else {
      addFavorite(dictionaryData?.word);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="bg-neutral-800 rounded-sm px-1.5 cursor-pointer border border-indigo-300/30"
    >
      {isFavorite ? (
        <p className="flex text-xs text-indigo-300  gap-1 items-center">
          added
          <span>
            <FavoriteIcon />
          </span>
        </p>
      ) : (
        <p className="flex text-xs text-indigo-300 gap-1 items-center">
          add
          <span>
            <NoFavoriteIcon />
          </span>
        </p>
      )}
    </button>
  );
};

export default FavoriteButton;
