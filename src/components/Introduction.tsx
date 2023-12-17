const Introduction = () => {
  return (
    <div className="grid place-content-center min-h-20 text-center gap-3 md:gap-5 text-neutral-400 mt-10">
      <p className="text-2xl mb-2">Type a word to look up in...</p>
      <p className="text-neutral-500">Most common use for the word might not appear first in results</p>
      <p className="text-neutral-500">"Similar words" will enable only if such data exists</p>
      <p className="text-neutral-500">Some "Similar words" might not be available</p>
      <p className="text-neutral-500">
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
    </div>
  );
};

export default Introduction;

// https://rapidapi.com/hub
