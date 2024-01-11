import { ReactNode, createContext, useState } from "react";

import { DictionaryItem, WordSimilarTo } from "../../types";

import { DictionaryCtx } from "../../types";

export const DictionaryDataContext = createContext<DictionaryCtx | null>(null);

const baseUrl = import.meta.env.VITE_DICTAPI_URL;
const apiKey = import.meta.env.VITE_DICTAPI_KEY;
const host = import.meta.env.VITE_DICTAPI_HOST;
const subjectQuery = "similarTo";
const randomWordURL = import.meta.env.VITE_DICTAPI_RANDOM;
const headers = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": host,
};
const regex = /^[a-zA-Z\s]*[a-zA-Z\s'.-]+[a-zA-Z\s]*$/;
const spaceRegex = /^ *$/;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const DictionaryContext = ({ children }: { children: ReactNode }) => {
  const [dictionaryData, setDictionaryData] = useState<DictionaryItem | null>(
    null
  );
  const [similarToData, setSimilarToData] = useState<WordSimilarTo | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [storedWords, setStoredWords] = useState<Array<string>>([]);
  const [isReseteableEn, setIsReseteableEn] = useState<boolean>(false);

  const handleErrors = (error: unknown) => {
    setError(error instanceof Error ? error.message : String(error));
  };

  const updateFirstWords = (word: string, cleanArray: boolean) => {
    if (cleanArray) {
      setStoredWords([word]);
    } else {
      setStoredWords((prevWords) => [...prevWords, word]);
      setIsReseteableEn(true);
    }
  };

  const fetchDictionaryRandom = async () => {
    setIsLoading(true);
    try {
      const resOne = await fetch(randomWordURL, { headers });

      if (!resOne.ok) {
        throw new Error("Error fetching random word");
      }

      const data1 = await resOne.json();
      const resTwo = await fetch(`${baseUrl}${data1.word}/${subjectQuery}`, {
        headers,
      });
      const data2 = await resTwo.json();

      setDictionaryData(data1);
      setSimilarToData(data2);
      updateFirstWords(data1.word, true);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDictionary = async (
    word: string,
    cleanArray: boolean = false
  ): Promise<void> => {
    setIsLoading(true);
    setDictionaryData(null);
    setSimilarToData(null);
    setError("");

    try {
      switch (true) {
        case spaceRegex.test(word):
          throw new Error(
            "Spaces are allowed only in contexts like, e.g., 'look after', 'get out'."
          );
        case !regex.test(word):
          throw new Error(`"${word}" contains invalid characters`);
        default:
          break;
      }

      const resOne = await fetch(`${baseUrl}${word}`, { headers });
      await delay(250);
      const resTwo = await fetch(`${baseUrl}${word}/${subjectQuery}`, {
        headers,
      });

      if (!resOne.ok) {
        throw new Error(`No entries found for "${word}"`);
      }

      const data1 = await resOne.json();
      const data2 = await resTwo.json();

      setDictionaryData(data1);
      setSimilarToData(data2);
      updateFirstWords(word, cleanArray);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DictionaryDataContext.Provider
      value={{
        dictionaryData,
        similarToData,
        error,
        isLoading,
        storedWords,
        isReseteableEn,
        setDictionaryData,
        setSimilarToData,
        setError,
        setIsReseteableEn,
        fetchDictionary,
        fetchDictionaryRandom,
      }}
    >
      {children}
    </DictionaryDataContext.Provider>
  );
};
