import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FavoritesProvider } from "./context/favoriteWords/FavoriteWordsProvider";
import { DictionaryProvider } from "./context/api/DictionaryProvider";
import Compose from "./compose/Compose";
import FunctionalityProvider from "./context/functionalities/FunctionalityProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Compose
    ctxComponents={[
      DictionaryProvider,
      FunctionalityProvider,
      FavoritesProvider,
    ]}
  >
    <App />
  </Compose>,
);
