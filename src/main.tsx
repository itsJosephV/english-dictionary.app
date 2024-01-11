import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FavoritesProvider } from "./context/favoriteWords/FavoriteWordsContext";
import { DictionaryContext } from "./context/api/DictionaryContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DictionaryContext>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </DictionaryContext>
);
