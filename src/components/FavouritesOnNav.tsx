import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { RemoveFavorite } from "../icons/RemoveFavorite";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const FavouritesOnNav = ({ triggerClasses}: { triggerClasses: string}) => {
  const { favorites, removeFavorite } = useFavoriteWords();
  const { fetchDictionary, setIsReseteableEn } = useDictionaryContext()

  const iconStyle =
    "text-[1.3rem] text-neutral-400 hover:text-white duration-200";
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={`flex items-center outline-none ${triggerClasses}`}
      >
        <FavoriteIcon className={iconStyle} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          side="bottom"
          className="min-w-[180px] bg-neutral-950/50 backdrop-blur-md rounded-md p-1.5 border border-neutral-800"
        >
          {!favorites.length && (
            <DropdownMenu.Item>
              <p className="p-1.5 text-neutral-400 text-sm">Save up to 20 words</p>
            </DropdownMenu.Item>
          )}
          {favorites &&
            favorites.map((item) => {
              return (
                <DropdownMenu.Item
                  key={item}
                  className="p-1.5 h-[30px] flex items-center rounded-md data-[highlighted]:bg-neutral-800 duration-200 outline-none"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fetchDictionary(item, true);
                      setIsReseteableEn(false)
                    }}
                    className="flex flex-grow  text-sm text-neutral-400 hover:text-white duration-200"
                  >
                    {item}
                  </button>
                  <button
                    className=" p-0.5 text-neutral-500 hover:text-white duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFavorite(item);
                    }}
                  >
                    <RemoveFavorite />
                  </button>
                </DropdownMenu.Item>
              );
            })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default FavouritesOnNav;
