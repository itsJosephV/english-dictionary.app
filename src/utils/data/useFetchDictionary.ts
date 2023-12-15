import { useState } from "react";
import { DictionaryItem } from "../../types";

export const useFetchDictionary = () => {
  const [data, setData] = useState<DictionaryItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [firstWords, setFirstWords] = useState<Array<string>>([])
  const [firstInArr, setFirstInArr] = useState<boolean>(false);


  const updateFirstWords = (word: string, cleanArray: boolean) => {
    if (cleanArray) {
      setFirstWords([word]);
    } else {
      setFirstWords((prevWords) => [...prevWords, word]);
      setFirstInArr(true);
    }
  };

  const fetchDictionary = async (word: string, cleanArray: boolean = false): Promise<void> => {
    const regex = /^[a-zA-Z\s]*$/;
    const spaceRegex = /^ *$/;
    setData(null);
    setError("");
    setIsLoading(true);

    try {
      switch (true) {
        case spaceRegex.test(word):
          throw new Error("Spaces are allowed only in contexts like, e.g., 'look after', 'get out'.")
        case !regex.test(word):
          throw new Error(`No entries found for "${word}"`)
        default:
          break;
      }

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!response.ok) {
        throw new Error(`No entries found for "${word}"`);
      }

      const data = await response.json();
      setData(data[0]);

      updateFirstWords(word, cleanArray)

    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };
  return { data, error, isLoading, firstWords, firstInArr, setData, setError, setFirstInArr, fetchDictionary }
}

