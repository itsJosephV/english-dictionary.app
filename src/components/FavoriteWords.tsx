import { RemoveFavorite } from "../icons/RemoveFavorite";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWords";

const FavoriteWords = () => {
  const { favorites, removeFavorite } = useFavoriteWords();

  return (
    <>
      <p className="mb-1.5 font-bold">Favorites</p>
      <div className="min-h-[26px]">
        {!favorites.length ? (
          <div className="text-neutral-500">
            Save up to 20 meaningful words, learn them, replace them.
          </div>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {favorites.map((item) => (
              <li
                className="px-1.5 py-0.5 bg-neutral-800/50 border border-neutral-700 text-sm duration-200 rounded-md"
                key={item}
              >
                <div className="flex gap-2">
                  <button
                    className="flex flex-grow text-neutral-300 hover:text-white duration-200"
                    onClick={() => console.log("item clicked")}
                  >
                    {item}
                  </button>
                  <button
                    className="flex items-center text-neutral-500 hover:text-white duration-200"
                    onClick={() => removeFavorite(item)}
                  >
                    <RemoveFavorite />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FavoriteWords;
