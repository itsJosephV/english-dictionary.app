import { RandomIcon } from "../icons/RandomIcon";
import ShortCutsInfo from "./ShortCutsInfo";
import { useDictionaryContext } from "../context/api/useDictionaryContext";

const Introduction = () => {
  const currentYear = new Date().getFullYear();
  const { fetchDictionaryRandom } = useDictionaryContext();

  return (
    <div className="grid place-content-center min-h-20 text-center text-neutral-400 mt-7">
      <div className="flex flex-col gap-3 mb-10">
        <p className="text-2xl">Type a word to look up in...</p>
        <div className="flex items-center gap-1.5 justify-center">
          <p className="text-lg">or get a</p>
          <button
            onClick={() => {
              fetchDictionaryRandom();
              console.log("test");
            }}
            className=" px-1.5 rounded-md text-neutral-300 border border-neutral-700 hover:text-white duration-200 bg-neutral-800/50 flex items-center gap-1"
          >
            random word{" "}
            <span>
              <RandomIcon />
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-10">
        <p className="text-neutral-500">
          Most common use for the word might not appear first in results
        </p>
        <p className="text-neutral-500">
          "Similar words" will enable if such data exists
        </p>
        <p className="text-neutral-500">
          Some "Similar words" might not be available
        </p>
        <p className="text-neutral-500">
          Lucia doesn't like the design of this app 🥹{" "}
          <span>
            <a
              href="https://www.linkedin.com/in/lucia-tomondyova/"
              target="_blank"
              rel="noopener noreferrer"
            >her profile</a>
          </span>
        </p>
      </div>
      <label htmlFor="" className="flex flex-col mb-10">
        <p className="text-xs mb-2 text-neutral-500">
          Keyboard shorcuts (Desktop)
        </p>
        <ShortCutsInfo />
      </label>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-500">
          by JosephV / {currentYear} - Present
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
        <p className="text-orange-400 text-sm">🚧 Work in progress 🚧</p>
      </div>
    </div>
  );
};

export default Introduction;
