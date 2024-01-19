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
          className="w-[180px] bg-neutral-950/50 backdrop-blur-md rounded-md p-1.5 border border-neutral-800"
        >
          {!favorites.length && (
            <>
              <DropdownMenu.Item className="p-1.5 ">
                <p className="text-neutral-400 text-sm text-center font-serif">
                  Save up to 15 words
                </p>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="p-1.5">
                <p className="text-sm text-neutral-600 text-center ">
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
                  className="flex justify-between rounded-md data-[highlighted]:bg-neutral-800 duration-200 outline-none"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fetchDictionary(item, true);
                      setIsReseteableEn(false);
                    }}
                    className="text-sm text-neutral-400 hover:text-white duration-200 overflow-hidden text-ellipsis whitespace-nowrap w-full text-start py-1 pl-1.5"
                  >
                    {item}
                  </button>
                  <button
                    className="py-1 pr-1.5 text-neutral-500 hover:text-white duration-200 block"
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
