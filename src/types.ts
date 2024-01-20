export interface WordResults {
  definition: string;
  derivation?: string;
  examples?: string[];
  partOfSpeech: string;
  antonyms?: string[];
  synonyms?: string[];
}

export interface DictionaryItem {
  pronunciation?: {
    all: string
  };
  results: WordResults[];
  word: string;
}

export interface WordSimilarTo {
  length: number;
  similarTo?: string[];
}

export interface FavoriteWords {
  favorites: string[];
  addFavorite: (word: string) => void
  removeFavorite: (word: string) => void
  cleanLocalStorage: () => void
}

export interface DictionaryCtx {
  dictionaryData: DictionaryItem | null;
  similarToData: WordSimilarTo | null;
  error: string | null;
  isLoading: boolean;
  storedWords: string[];
  isReseteableEn: boolean;
  setDictionaryData: (data: DictionaryItem | null) => void;
  setSimilarToData: (data: WordSimilarTo | null) => void;
  setStoredWords: React.Dispatch<React.SetStateAction<string[]>>
  setError: (error: string | null) => void;
  setIsReseteableEn: (value: boolean) => void;
  fetchDictionary: (word: string, cleanArray?: boolean) => Promise<void>;
  fetchDictionaryRandom: () => Promise<void>;

  inputFlag: boolean
}

export interface FunctionalityCtx {
  word: string | null;
  form: React.RefObject<HTMLFormElement>;
  isSimilarWordsActive: boolean;
  resultsLimit: number | null;
  isClearEn: boolean;
  settings: {
    autofocus: boolean;
    details: boolean;
  }
  handleFormSubmit: (word: string) => Promise<void>;
  handleSimilarToButton: (e: React.ChangeEvent<HTMLDetailsElement>) => void;
  handleCleanResults: (e: React.FormEvent) => void;
  handleBackToFirst: () => void;
  setWord: React.Dispatch<React.SetStateAction<string | null>>;
  setSettings: React.Dispatch<React.SetStateAction<{
    autofocus: boolean;
    details: boolean;
  }>>
  setResultsLimit: React.Dispatch<React.SetStateAction<number | null>>;
}



