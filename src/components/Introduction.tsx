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
    <div className="flex flex-col min-h-20 text-center text-neutral-400">
      <div className="mb-10">
        <p className="text-lg flex gap-1.5 justify-center">
          or get a
          <span>
            <button
              onClick={() => {
                fetchDictionaryRandom();
              }}
              className="text-indigo-400 hover:text-indigo-300 duration-200 flex items-center gap-1 text-lg"
            >
              random word{" "}
              <span>
                <RandomIcon />
              </span>
            </button>
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 mb-10">
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
      <div className="flex-row justify-center gap-5 mx-auto pb-2 md:flex hidden mb-10">
        {items.map((item, idx) => (
          <ShortCutInfo kbd={item.kbd} title={item.title} key={idx} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-500">
          built by{" "}
          <a
            className=" text-neutral-400 hover:text-white duration-300"
            href="https://github.com/itsJosephV"
            target="_blank"
            rel="noopener noreferrer"
          >
            @itsJosephV
          </a>{" "}
          / {currentYear} - Present
        </p>
        <p className="text-neutral-500 text-sm">
          Powered by{" "}
          <a
            className="underline text-neutral-400 hover:text-white duration-300"
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
    <div className="flex justify-between items-center gap-1.5">
      <span className="text-sm text-neutral-500">{title}</span>
      <kbd className="flex items-center rounded-sm px-1.5 text-sm font-sans bg-neutral-700/50 font-medium text-neutral-400">
        {kbd}
      </kbd>
    </div>
  );
};
