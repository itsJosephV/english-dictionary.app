import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { NoFavoriteIcon } from "../icons/NoFavoriteIcon";
import { useDictionaryContext } from "../context/api/useDictionaryContext";

const FavoriteButton = () => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteWords();
  const { dictionaryData } = useDictionaryContext()

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
      className="bg-neutral-800 rounded-sm px-1.5 py-0.5 cursor-pointer"
    >
      {isFavorite ? (
        <p className="flex text-xs text-indigo-400 hover:text-white duration-200  gap-1 items-center">
          added
          <span>
            <FavoriteIcon />
          </span>
        </p>
      ) : (
        <p className="flex text-xs text-indigo-400 hover:text-white duration-200 gap-1 items-center">
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
