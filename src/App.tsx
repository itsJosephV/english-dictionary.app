import SettNav from "./components/SettNav";
import FavoriteWords from "./components/FavoriteWords";
import Form from "./components/Form";
import SimilarToList from "./components/SimilarToList";
import List from "./components/List";

const App = () => {
  return (
    <>
      <SettNav />
      <main className="max-w-[640px] mx-auto pt-10 md:pt-12 px-5 pb-6 min-h">
        <section className="mb-7">
          <FavoriteWords />
        </section>
        <section className="mb-7">
          <Form />
          <SimilarToList />
        </section>
        <section className="mt-7 mb-1">
          <List />
        </section>
      </main>
    </>
  );
};

export default App;
