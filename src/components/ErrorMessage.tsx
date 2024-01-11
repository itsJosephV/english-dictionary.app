import { useDictionaryContext } from "../context/api/useDictionaryContext";

const ErrorMessage = () => {
  const { error } = useDictionaryContext()
  return (
    <div className="flex justify-center flex-col text-center gap-2 mt-5">
      <p className="text-red-400">{error}</p>
    </div>
  );
};

export default ErrorMessage;
