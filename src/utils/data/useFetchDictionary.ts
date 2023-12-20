import { useState } from "react";

import { DictionaryItem, WordSimilarTo } from "../../types";

export const useFetchDictionary = () => {

  const [dataDictionary, setDataDictionary] = useState<DictionaryItem | null>(null);
  const [dataWordSimilar, setDataWordSimilar] = useState<WordSimilarTo | null>(null);
  const [cleaner, setCleaner] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [firstWords, setFirstWords] = useState<Array<string>>([])
  const [firstInArr, setFirstInArr] = useState<boolean>(false);


  const baseUrl = import.meta.env.VITE_DICTAPI_URL
  const apiKey = import.meta.env.VITE_DICTAPI_KEY
  const randomWordURL = import.meta.env.VITE_DICTAPI_RANDOM
  const query = "similarTo";
  const headers = {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": import.meta.env.VITE_DICTAPI_HOST
  };
  const regex = /^[a-zA-Z\s][a-zA-Z\s'.-]+[a-zA-Z\s]$/
  const spaceRegex = /^ *$/;

  const handleErrors = (error: unknown) => {
    setError(error instanceof Error ? error.message : String(error));
  };

  const updateFirstWords = (word: string, cleanArray: boolean) => {
    if (cleanArray) {
      setFirstWords([word]);
    } else {
      setFirstWords((prevWords) => [...prevWords, word]);
      setFirstInArr(true);
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchDictionaryRandom = async () => {
    setIsLoading(true);
    try {
      const resOne = await fetch(randomWordURL, { headers })

      if (!resOne.ok) {
        throw new Error('Error fetching random word');
      }

      const data1 = await resOne.json()
      const resTwo = await fetch(`${baseUrl}${data1.word}/${query}`, { headers });
      const data2 = await resTwo.json()
      
      setDataDictionary(data1);
      setDataWordSimilar(data2);
      updateFirstWords(data1.word, true);

    } catch (error) {
      handleErrors(error)
    } finally {
      setIsLoading(false);
      setCleaner(true)
    }
  }

  const fetchDictionary = async (word: string, cleanArray: boolean = false): Promise<void> => {
    setDataDictionary(null);
    setDataWordSimilar(null)
    setError("");
    setIsLoading(true);

    try {
      switch (true) {
        case spaceRegex.test(word):
          throw new Error("Spaces are allowed only in contexts like, e.g., 'look after', 'get out'.")
        case !regex.test(word):
          throw new Error(`"${word}" contains invalid characters`)
        default:
          break;
      }

      const resOne = await fetch(`${baseUrl}${word}`, { headers });
      await delay(250);
      const resTwo = await fetch(`${baseUrl}${word}/${query}`, { headers });

      if (!resOne.ok) {
        throw new Error(`No entries found for "${word}"`);
      }

      const data1 = await resOne.json();
      const data2 = await resTwo.json();

      setDataDictionary(data1);
      setDataWordSimilar(data2);
      updateFirstWords(word, cleanArray)

    } catch (error) {
      handleErrors(error)
    } finally {
      setIsLoading(false);
      setCleaner(true)
    }
  };
  return { dataDictionary, dataWordSimilar, error, isLoading, firstWords, firstInArr, cleaner, setDataDictionary, setDataWordSimilar, setError, setFirstInArr, fetchDictionary, setCleaner, fetchDictionaryRandom }
}


