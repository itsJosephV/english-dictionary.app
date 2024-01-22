import { RandomIcon } from "../icons/RandomIcon";
import { useDictionaryContext } from "../context/api/useDictionaryContext";

const Introduction = () => {
  const currentYear = new Date().getFullYear();
  const { fetchDictionaryRandom } = useDictionaryContext();

  const items = [
    { kbd: "⇧M-L", title: "More/Less" },
    { kbd: "⇧S", title: "Similars" },
    { kbd: "⇧C", title: "Clear" },
    { kbd: "⇧R", title: "Reset" },
  ];

  return (
    <div className="min-h-20 flex flex-col text-center text-neutral-400">
      <div className="mb-10">
        <p className="flex justify-center gap-1.5 text-lg">
          or get a
          <span>
            <button
              tabIndex={0}
              onClick={() => {
                fetchDictionaryRandom();
              }}
              className="flex items-center gap-1 text-lg text-indigo-400 duration-200 hover:text-indigo-300"
            >
              random word{" "}
              <span>
                <RandomIcon />
              </span>
            </button>
          </span>
        </p>
      </div>
      <div className="mb-10 flex flex-col gap-2">
        <p className="text-neutral-500">
          Most common use for the word might not appear first in results.
        </p>
        <p className="text-neutral-500">
          "Similar words" will enable if such data exists.
        </p>
        <p className="text-neutral-500">
          Some "Similar words" might not be available.
        </p>
        {/* <p className="text-neutral-500">
          Lucia doesn't like the design of this app {":("}{" "}
          <span>
            <a
              href="https://www.linkedin.com/in/lucia-tomondyova/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500"
            >her profile</a>
          </span>
        </p> */}
      </div>
      <div className="mx-auto mb-10 hidden flex-row justify-center gap-5 pb-2 md:flex">
        {items.map((item, idx) => (
          <ShortCutInfo kbd={item.kbd} title={item.title} key={idx} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-500">
          built by{" "}
          <a
            className=" text-neutral-400 duration-300 hover:text-white"
            href="https://github.com/itsJosephV"
            target="_blank"
            rel="noopener noreferrer"
          >
            @itsJosephV
          </a>{" "}
          / {currentYear} - Present
        </p>
        <p className="text-sm text-neutral-500">
          Powered by{" "}
          <a
            className="text-neutral-400 underline duration-300 hover:text-white"
            href="https://rapidapi.com/hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            rapidapi.com
          </a>
        </p>
        {/* <p className="text-orange-400 text-sm">🚧 Work in progress 🚧</p> */}
      </div>
    </div>
  );
};

export default Introduction;

const ShortCutInfo = ({ kbd, title }: { kbd: string; title: string }) => {
  return (
    <div className="flex items-center justify-between gap-1.5">
      <span className="text-sm text-neutral-500">{title}</span>
      <kbd className="flex items-center rounded-sm bg-neutral-700/50 px-1.5 font-sans text-sm font-medium text-neutral-400">
        {kbd}
      </kbd>
    </div>
  );
};
