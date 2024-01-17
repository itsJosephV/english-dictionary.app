const ShortCutsInfo = () => {
  const items = [
    { kbd: "⇧M-L", title: "More/Less" },
    { kbd: "⇧S", title: "Similars" },
    { kbd: "⇧C", title: "Clear" },
    { kbd: "⇧R", title: "Reset" },
  ];
  return (
    <div className="flex flex-col justify-center md:gap-3 gap-2 mx-auto border p-2 rounded-md border-neutral-700">
      {items.map((item, idx) => (
        <ShortCutInfo kbd={item.kbd} title={item.title} key={idx} />
      ))}
    </div>
  );
};

export default ShortCutsInfo;

const ShortCutInfo = ({ kbd, title }: { kbd: string; title: string }) => {
  return (
    <div className="flex gap-1 items-center">
      <kbd className="flex items-center rounded-md py-0.5 px-1.5 text-sm font-sans bg-neutral-700/50 font-medium text-neutral-400">
        {kbd}
      </kbd>
      <span className="text-sm text-neutral-400">{title}</span>
    </div>
  );
};
