import { Definition } from "../types";

interface WordCardProps {
  item: Definition;
}

const DefinitionCard: React.FC<WordCardProps> = ({ item }) => {
  return (
    <li className="mb-3 bg-neutral-700/40 hover:bg-neutral-700 duration-200 py-2 px-3 rounded-sm last:mb-0">
      <p className="text-sm text-neutral-400">{item.partOfSpeech}</p>
      <p>{item.definition}</p>
      <p className="text-neutral-500">
        {item.example && "Example:"} {item.example}
      </p>
    </li>
  );
};

export default DefinitionCard;
