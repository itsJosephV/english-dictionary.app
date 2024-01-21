import { useState } from "react";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { RemoveFavorite } from "../icons/RemoveFavorite";

const FavouritesDesktop = () => {
  const { favorites, removeFavorite } = useFavoriteWords();
  const { fetchDictionary, setIsReseteableEn } = useDictionaryContext();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <section className="custom-media fixed z-10 hidden w-full max-w-[160px]">
      <div className="mb-5">
        <h1 className="mb-1 font-medium text-neutral-400">Favourites</h1>
        <p className="font-serif text-sm text-neutral-500">
          {""}Save up to 15 words
        </p>
      </div>
      {!favorites.length && (
        <div>
          <p className="text-sm text-neutral-600 ">
            {"{ "}No favourites found{" }"}
          </p>
        </div>
      )}
      {favorites && (
        <ul className="">
          {favorites.map((item) => {
            return (
              <li
                className="mt-2 flex justify-between"
                key={item}
                onMouseEnter={() => setHoveredIndex(item)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start text-sm text-neutral-500 outline-none duration-200 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchDictionary(item, true);
                    setIsReseteableEn(false);
                  }}
                >
                  {"·"} {item}
                </button>
                {hoveredIndex === item && (
                  <button
                    className="p-0.5 text-neutral-500 duration-200 hover:text-white"
                    onClick={() => removeFavorite(item)}
                  >
                    <RemoveFavorite />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default FavouritesDesktop;
