import ShortCutsInfo from "./ShortCutsInfo";
import InputAF from "./InputAF";

type Props = {
  isAutoFocusEn: boolean,
  setIsAutoFocusEn: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = ({isAutoFocusEn, setIsAutoFocusEn}) => {
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
        <InputAF isAutoFocusEn={isAutoFocusEn} setIsAutoFocusEn={setIsAutoFocusEn} />
      </div>
    </header>
  );
};

export default Header;
