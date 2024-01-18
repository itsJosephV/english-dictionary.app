import { useState } from "react";
import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { RemoveFavorite } from "../icons/RemoveFavorite";

const FavouritesDesktop = () => {
  const { favorites, removeFavorite } = useFavoriteWords();
  const { fetchDictionary, setIsReseteableEn } = useDictionaryContext();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  return (
    <section className="fixed w-full max-w-[160px] z-10 custom-media hidden">
      <div className="mb-5">
        <h1 className="font-bold text-neutral-400 mb-1">Favourites</h1>
        <p className="text-neutral-500 text-sm font-serif">
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
                className="flex mt-2 justify-between"
                key={item}
                onMouseEnter={() => setHoveredIndex(item)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  className="text-sm text-neutral-500 hover:text-white duration-200 outline-none overflow-hidden text-ellipsis whitespace-nowrap w-full text-start"
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
                    className="p-0.5 text-neutral-500 hover:text-white duration-200"
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
