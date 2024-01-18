import SettNav from "./components/SettNav";
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";
import List from "./components/List";
import FavouritesDesktop from "./components/FavouritesDesktop";

const App = () => {
  return (
    <>
      <SettNav />
      <main className="min-h pt-14 px-5 pb-3 w-full max-w-[1440px] mx-auto relative">
        <FavouritesDesktop />
        <section className="h-full w-full max-w-[640px] mx-auto pb-1.5">
          <div>
            <p className="text-neutral-400 font-medium mb-8 text-2xl text-center">
              Type a word to look it up!
            </p>
            <Form />
            <SimilarToList />
          </div>
          <div className="mt-7">
            <List />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
