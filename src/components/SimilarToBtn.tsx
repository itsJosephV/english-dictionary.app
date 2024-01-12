import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";

type Props = {
  simItem: string;
};

const SimilarToBtn: React.FC<Props> = ({ simItem }) => {
  const { handleWordDerivates } = useFunctionalityContext();

  return (
    <button onClick={() => handleWordDerivates(simItem)}>{simItem}</button>
  );
};

export default SimilarToBtn;
