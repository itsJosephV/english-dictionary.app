import { useDictionaryContext } from "../context/api/useDictionaryContext";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { RemoveFavorite } from "../icons/RemoveFavorite";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const FavouritesOnNav = ({ triggerClasses }: { triggerClasses: string }) => {
  const { favorites, removeFavorite } = useFavoriteWords();
  const { fetchDictionary, setIsReseteableEn } = useDictionaryContext();

  const iconStyle =
    "text-[1.3rem] text-indigo-400 hover:text-indigo-300 duration-200";
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
          className="w-[180px] rounded-md border border-neutral-800 bg-neutral-950/50 p-1.5 backdrop-blur-md"
        >
          {!favorites.length && (
            <>
              <DropdownMenu.Item className="p-1.5 ">
                <p className="text-center font-serif text-sm text-neutral-400">
                  Save up to 15 words
                </p>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="p-1.5">
                <p className="text-center text-sm text-neutral-600 ">
                  {"{ "}No favourites found{" }"}
                </p>
              </DropdownMenu.Item>
            </>
          )}
          {favorites &&
            favorites.map((item) => {
              return (
                <DropdownMenu.Item
                  key={item}
                  className="flex justify-between rounded-md outline-none duration-200 data-[highlighted]:bg-neutral-800"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fetchDictionary(item, true);
                      setIsReseteableEn(false);
                    }}
                    className="w-full overflow-hidden text-ellipsis whitespace-nowrap py-1 pl-1.5 text-start text-sm text-neutral-400 duration-200 hover:text-white"
                  >
                    {item}
                  </button>
                  <button
                    className="block py-1 pr-1.5 text-neutral-500 duration-200 hover:text-white"
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
