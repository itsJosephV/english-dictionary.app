const ShortCutsInfo = () => {
  return (
    <div  className="flex flex-col md:flex-row justify-center md:gap-3 gap-2 mx-auto border p-2 rounded-sm border-neutral-700">
      <div className="flex gap-1">
        <kbd className="flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700/50 font-medium text-neutral-400">
          ⇧M-L
        </kbd>
        <span className="text-sm text-neutral-400">More/Less</span>
      </div>
      <div className="flex gap-1">
        <kbd className="flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700/50 font-medium text-neutral-400">
          ⇧S
        </kbd>
        <span className="text-sm text-neutral-400">Similars</span>
      </div>
      <div className="flex gap-1">
        <kbd className="flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700/50 font-medium text-neutral-400">
          ⇧C
        </kbd>
        <span className="text-sm text-neutral-400">Clear</span>
      </div>
      <div className="flex gap-1">
        <kbd className="flex items-center rounded-sm px-1 text-sm font-sans bg-neutral-700/50 font-medium text-neutral-400">
          ⇧R
        </kbd>
        <span className="text-sm text-neutral-400">Reset</span>
      </div>
    </div>
  );
};

export default ShortCutsInfo;


// border border-neutral-700 p-1.5 rounded-sm flex flex-col md:flex-row  md:gap-3 gap-1.5 md:items-center items-start md:justify-between