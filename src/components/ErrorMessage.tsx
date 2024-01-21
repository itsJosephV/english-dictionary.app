import { useDictionaryContext } from "../context/api/useDictionaryContext";

const ErrorMessage = () => {
  const { error } = useDictionaryContext();
  return (
    <div className="mt-5 flex flex-col justify-center gap-2 text-center">
      <p className="text-red-400">{error}</p>
    </div>
  );
};

export default ErrorMessage;
