export interface Phonetic {
  text: string;
  audio?: string;
}

export interface DictionaryItem {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

export interface Definition {
  definition: string;
  example: string
  synonyms?: string[];
  antonyms?: string[];
  partOfSpeech: string;
}

export interface Meaning {
  definitions: Definition[];
  synonyms?: string[];
  example?:string
  antonyms?: string[];
  partOfSpeech: string;
}