import { WordResults } from "../types";

interface WordCardProps {
  item: WordResults;
}

const DefinitionCard: React.FC<WordCardProps> = ({ item }) => {
  return (
    <li className="mb-3 bg-neutral-700/40 hover:bg-neutral-700 duration-200 py-2 px-3 rounded-sm last:mb-0">
      <p className="text-sm text-neutral-400">{item.partOfSpeech}</p>
      <p>{item.definition}</p>
      <div className="text-neutral-500">
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            listStyle: "none",
          }}
        >
          {item.examples?.map((example, i) => (
            <li key={i}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ fontSize: "12px", marginRight: "5px" }}>
                  {i + 1}.
                </span>
                <p style={{ fontSize: "12px" }}>{example}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: ".3rem",
          marginTop: "10px",
        }}
      >
        {item.synonyms?.map((syn, i) => (
          <p
            style={{
              border: "1px solid green",
              borderRadius: "5px",
              padding: "3px",
            }}
            key={i}
          >
            {syn}
          </p>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: ".3rem",
          marginTop: "10px",
        }}
      >
        {item.antonyms?.map((ant, i) => (
          <p
            style={{
              border: "1px solid red",
              borderRadius: "5px",
              padding: "3px",
            }}
            key={i}
          >
            {ant}
          </p>
        ))}
      </div>
    </li>
  );
};

export default DefinitionCard;
