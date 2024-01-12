import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

type Props = {
  simItem: string;
};

const SimilarToBtn: React.FC<Props> = ({ simItem }) => {
  const { handleSimilarToFetch } = useFunctionalityContext();

  return (
    <button onClick={() => handleSimilarToFetch(simItem)}>{simItem}</button>
  );
};

export default SimilarToBtn;
