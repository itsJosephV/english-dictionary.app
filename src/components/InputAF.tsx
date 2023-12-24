import React from "react";

type Props = {
  isAutoFocusEn: boolean;
  setIsAutoFocusEn: (autofocus: boolean) => void
}

const InputAF: React.FC<Props> = ({ isAutoFocusEn, setIsAutoFocusEn }) => {
  return (
    <label className="p-1.5 justify-between rounded-sm inline-flex gap-3 items-center">
      <span className="text-sm text-neutral-300">
        Input auto-focus {"(Only Desktop)"}
      </span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          onChange={() => setIsAutoFocusEn(!isAutoFocusEn)}
          checked={isAutoFocusEn}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500" />
      </div>
    </label>
  );
};

export default InputAF;
