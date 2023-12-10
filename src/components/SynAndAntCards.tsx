import React from "react";

interface SanitizedSynAndAnt {
  synonyms?: string[];
  antonyms?: string[];
}

const SynAndAntCards: React.FC<SanitizedSynAndAnt> = ({
  synonyms,
  antonyms,
}) => {
  return (
    <div className="mt-4">
      {synonyms && synonyms.length > 0 && (
        <div className="flex flex-col gap-1.5 mb-3">
          <p className="text-sm text-neutral-400">Synonyms</p>
          <ul className="flex flex-row gap-2 flex-wrap">
            {synonyms &&
              synonyms.map((synItem, i) => (
                <li
                  className="bg-neutral-700 rounded-sm px-1.5 text-xs"
                  key={i}
                >
                  {synItem}
                </li>
              ))}
          </ul>
        </div>
      )}
      {antonyms && antonyms.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-neutral-400">Antonyms</p>
          <ul className="flex flex-row gap-2 flex-wrap">
            {antonyms &&
              antonyms.map((antItem, i) => (
                <li
                  className="bg-neutral-700 rounded-sm px-1.5 text-xs"
                  key={i}
                >
                  {antItem}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SynAndAntCards;
