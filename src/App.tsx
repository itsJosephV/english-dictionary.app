import SettNav from "./components/SettNav";
// import FavoriteWords from "./components/FavoriteWords";
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";
import List from "./components/List";
import FavouritesTest2 from "./components/FavouritesTest2";

const App = () => {
  return (
    <>
      <SettNav />
      <div className="flex flex-row relative">
        <FavouritesTest2 />
        <main className="max-w-[640px] mx-auto pt-10 md:pt-12 px-5 pb-6 min-h w-full">
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
