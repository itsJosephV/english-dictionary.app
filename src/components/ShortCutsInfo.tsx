const ShortCutsInfo = () => {
  return (
    <div className="border border-neutral-700 p-1.5 rounded-sm inline-flex gap-3 items-center justify-between">
      <div className="flex gap-1">
        <span className="text-sm text-neutral-300">Clear</span>
        <kbd className="inline-flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700 font-medium text-white">
          ⇧C
        </kbd>
      </div>
      <div className="flex gap-1">
        <span className="text-sm text-neutral-300">More/Less</span>
        <kbd className="inline-flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700 font-medium text-white">
          ⇧M or L
        </kbd>
      </div>
      <div className="flex gap-1">
        <span className="text-sm text-neutral-300">S/A</span>
        <kbd className="inline-flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700 font-medium text-white">
          ⇧S
        </kbd>
      </div>
    </div>
  );
};

export default ShortCutsInfo;
