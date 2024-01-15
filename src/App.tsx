import SettNav from "./components/SettNav";
// import FavoriteWords from "./components/FavoriteWords";
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";
import List from "./components/List";
import { useFavoriteWords } from "./context/favoriteWords/useFavoriteWordsContext";
import { RemoveFavorite } from "./icons/RemoveFavorite";
import { useFunctionalityContext } from "./context/functionalities/useFunctionalityContext";

const App = () => {
  const { favorites, removeFavorite } = useFavoriteWords();
  const { handleFavoriteFetch } = useFunctionalityContext();
  return (
    <>
      <SettNav />
      <div className="flex flex-row relative">
        <div className="absolute h-auto max-w-[220px] left-0 pt-12 z-10 custom-media hidden">
          <div className=" bg-neutral-950/50 backdrop-blur-md rounded-md p-3 border border-neutral-800">
            <div className="mb-5">
              <h1 className=" font-bold">Favorites ★</h1>
              <p className="text-neutral-400 text-sm">Save up to 25 words</p>
            </div>
            {!favorites.length && (
              <p className="text-sm text-neutral-400">No favorites found</p>
            )}
            {favorites && (
              <ul className="">
                {favorites.map((item) => {
                  return (
                    <li
                      className="h-[30px] p-1.5 flex items-center rounded-md hover:bg-neutral-800 duration-200 outline-none"
                      key={item}
                    >
                        <button
                          className="flex flex-grow text-sm text-neutral-400 hover:text-white duration-200 truncate ..."
                          onClick={() => handleFavoriteFetch(item)}
                        >
                          {item}
                        </button>
                        <button
                          className="p-0.5 text-neutral-500 hover:text-white duration-200" 
                          onClick={() => removeFavorite(item)}
                        >
                          <RemoveFavorite />
                        </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <main className="max-w-[640px] mx-auto pt-10 md:pt-12 px-5 pb-6 min-h w-full">
          {/* <section className="mb-7">
            <FavoriteWords />
          </section> */}
          <section className="mb-7">
            <Form />
            <SimilarToList />
          </section>
          <section className="mt-7 mb-1">
            <List />
          </section>
        </main>
      </div>
    </>
  );
};

export default App;
