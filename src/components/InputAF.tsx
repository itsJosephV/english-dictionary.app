import React from "react";

type Props = {
  isAutoFocusEn: boolean;
  setIsAutoFocusEn: (autofocus: boolean) => void
}

const InputAF: React.FC<Props> = ({ isAutoFocusEn, setIsAutoFocusEn }) => {
  return (
    <label className="flex gap-2 items-center">
      <span className="text-sm text-neutral-300">
        auto-focus
      </span>
      <input
          type="checkbox"
          onChange={() => setIsAutoFocusEn(!isAutoFocusEn)}
          checked={isAutoFocusEn}
          // disabled
        />
    </label>
  );
};

export default InputAF;
