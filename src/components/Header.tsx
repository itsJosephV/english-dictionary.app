import ShortCutsInfo from "./ShortCutsInfo";
import InputAF from "./InputAF";

type Props = {
  autofocus: boolean,
  SetAutoFocus: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = ({autofocus, SetAutoFocus}) => {
  return (
    <header className="max-w-[850px] mx-auto px-5">
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
