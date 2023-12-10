import React from "react";
interface ErrorType {
  error: string
}

const ErrorMessage: React.FC<ErrorType> = ({ error }) => {
  return (
    <div className="flex justify-center flex-col text-center gap-2 mt-5">
      <p className="text-red-400">{error}</p>
      {/* <p className="text-red-300">"Spaces are allowed in the context, e.g., 'look after.'"</p> */}
    </div>
  );
};

export default ErrorMessage;
