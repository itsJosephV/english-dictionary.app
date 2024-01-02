import { ReactNode, createContext, useEffect, useState } from "react";

import { FavoriteWords } from "../../types";

export const FavoriteWordsContext = createContext<FavoriteWords | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (word: string) => {
    if (favorites.length < 10) {
      setFavorites((prevFavs) => [...prevFavs, word]);
    } else {
      alert("only 10 fav words allowed");
    }
  };

  const removeFavorite = (word: string) => {
    setFavorites((prevFavs) => prevFavs.filter((item) => item !== word));
  };

  const cleanLocalStorage = () => {
    if (!favorites.length) {
      return;
    }
    if (window.confirm("are you sure?")) {
      setFavorites([]);
    }
  };

  return (
    <FavoriteWordsContext.Provider
      value={{ favorites, addFavorite, removeFavorite, cleanLocalStorage }}
    >
      {children}
    </FavoriteWordsContext.Provider>
  );
};
