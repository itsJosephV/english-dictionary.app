import SettNav from "./components/SettNav";
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";
import List from "./components/List";
import FavouritesDesktop from "./components/FavouritesDesktop";

const App = () => {
  return (
    <>
      <SettNav />
      <main className="min-h relative mx-auto w-full max-w-[1440px] px-5 pb-6 pt-14">
        <FavouritesDesktop />
        <section className="mx-auto h-full w-full max-w-[640px]">
          <div>
            <h1 className="mb-8 text-center text-2xl font-medium text-neutral-400">
              Type a word to look it up!
            </h1>
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
