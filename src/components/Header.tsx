import ShortCutsInfo from "./ShortCutsInfo";
import InputAF from "./InputAF";

interface HeaderProps {
  autofocus: boolean,
  SetAutoFocus: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({autofocus, SetAutoFocus}) => {
  return (
    <header className="max-w-[850px] mx-auto px-5">
      <div className="text-orange-300 bg-orange-500/10 border border-orange-300 py-1 px-2 w-fit rounded-md mb-8">
        Dictionary App - Underwork 🚧{" "}
      </div>
      <div className="mb-8">
        <p className="text-4xl font-bold mb-1">Dictionary</p>
        <p className="text-neutral-400">
          Your personal app to search, save and learn about your favorite words.
        </p>
      </div>
      {/* <p>ShorCuts</p> */}
      <div className="md:items-center gap-2 flex flex-col md:flex-row justify-between w-fit md:w-[100%]">
        <ShortCutsInfo />
        <InputAF autofocus={autofocus} SetAutoFocus={SetAutoFocus} />
      </div>
    </header>
  );
};

export default Header;
