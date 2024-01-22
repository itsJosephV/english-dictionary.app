import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { NoFavoriteIcon } from "../icons/NoFavoriteIcon";
import { useDictionaryContext } from "../context/api/useDictionaryContext";

const FavoriteButton = () => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteWords();
  const { dictionaryData } = useDictionaryContext();

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
      className="cursor-pointer rounded-sm bg-neutral-800 px-1 py-0.5"
      tabIndex={0}
    >
      <p className="flex items-center gap-0.5 text-xs text-indigo-400 duration-200 hover:text-indigo-300">
        {isFavorite ? <FavoriteIcon /> : <NoFavoriteIcon />}
        {isFavorite ? <span>added</span> : <span>add</span>}
      </p>
    </button>
  );
};

export default FavoriteButton;
