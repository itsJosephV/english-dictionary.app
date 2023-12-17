//? DEPECRATED COMPONENT
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-600/40">
      <div className="max-w-[850px] px-5 py-1.5 mx-auto flex justify-between">
        <div>
          <p className="text-orange-400 text-sm">work in progress 🚧</p>
        </div>
        <div>
          <p className="text-sm text-neutral-500">{currentYear}-Present</p>
        </div>
        <div>
          <a
            href="https://github.com/itsJosephV/dictionary-app/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 block hover:text-white duration-300 text-sm font-mono cursor-pointer"
          >
            source
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
