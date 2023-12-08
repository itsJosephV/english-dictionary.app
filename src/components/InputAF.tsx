import React from "react";

interface AFProps {
  autofocus: boolean;
  SetAutoFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputAF: React.FC<AFProps> = ({ autofocus, SetAutoFocus }) => {
  return (
    <label className="relative inline-flex items-center mb-5 cursor-pointer">
      <input
        type="checkbox"
        onChange={() => SetAutoFocus(!autofocus)}
        checked={autofocus}
        className="sr-only peer"
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Input auto-focus {"(Desktop)"}
      </span>
    </label>
  );
};

export default InputAF;
