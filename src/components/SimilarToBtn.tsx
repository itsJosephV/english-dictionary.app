import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

type Props = {
  simItem: string;
};

const SimilarToBtn: React.FC<Props> = ({ simItem }) => {
  const { setOnSimilarToWords } = useFunctionalityContext();
  const handleSimilarToButton = (synItem: string) => {
    if (synItem) {
      setOnSimilarToWords(synItem);
    }
  };
  return (
    <button onClick={() => handleSimilarToButton(simItem)}>{simItem}</button>
  );
};

export default SimilarToBtn;
