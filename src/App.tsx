import SettNav from "./components/SettNav";
// import FavoriteWords from "./components/FavoriteWords";
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";
import List from "./components/List";
import FavouritesDesktop from "./components/FavouritesDesktop";
// import ShortCutsInfo from "./components/ShortCutsInfo";

const App = () => {
  return (
    <>
      <SettNav />
      <main className="flex flex-row relative max-w-[1440px] min-h mx-auto">
        <FavouritesDesktop />
        {/* <div className="fixed right-0">
        <ShortCutsInfo />
        </div> */}
        <section className="pt-14 px-5 pb-6 h-full w-full">
          <div className="max-w-[640px] mx-auto">
            <div>
              <p className="text-neutral-400 mb-8 text-2xl text-center">
                Type a word to look up in...
              </p>
              <Form />
              <SimilarToList />
            </div>
            <div className="mt-7 mb-1">
              <List />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
