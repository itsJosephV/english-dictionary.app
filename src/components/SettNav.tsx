// import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SettingsIcon } from "../icons/SettingsIcon";
import { GitHubIcon } from "../icons/GithubIcon";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWords";

type Props = {
  isAutoFocusEn: boolean;
  isDetailsOpen: boolean;
  setIsAutoFocusEn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettNav: React.FC<Props> = ({
  isAutoFocusEn,
  isDetailsOpen,
  setIsDetailsOpen,
  setIsAutoFocusEn,
}) => {
  const { cleanLocalStorage, favorites } = useFavoriteWords();
  

  return (
    <nav className="border-b px-5 border-neutral-800 ">
      <div className="max-w-[1024px] mx-auto py-1.5 flex items-center">
        <p className="font-bold text-[1.2rem] flex-1">Dictionary</p>
        <a className="mr-2" href="" target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="text-[1.3rem]" />
        </a>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="flex items-center outline-none">
            <SettingsIcon className="text-[1.3rem]" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={10}
              side="bottom"
              className="min-w-[180px] bg-neutral-800 rounded-md p-1.5"
            >
              <DropdownMenu.Item
                onSelect={(e) => e.preventDefault()}
                className="p-1.5 text-sm h-[30px] flex items-center rounded-md data-[highlighted]:bg-neutral-700  outline-none"
              >
                <label className="w-full flex justify-between items-center">
                  Autofocus
                  <input
                    readOnly
                    type="checkbox"
                    onChange={() => setIsAutoFocusEn(!isAutoFocusEn)}
                    checked={isAutoFocusEn}
                  />
                </label>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={(e) => e.preventDefault()}
                className="p-1.5 text-sm h-[30px] flex items-center rounded-md data-[highlighted]:bg-neutral-700 outline-none"
              >
                <label className="w-full flex justify-between items-center">
                  Details
                  <input
                    readOnly
                    type="checkbox"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    checked={isDetailsOpen}
                  />
                </label>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => cleanLocalStorage()}
                disabled={!favorites.length}
                className="pl-1.5 pr-[3px] text-sm h-[30px] flex items-center justify-between rounded-md focus:bg-red-400/20 text-red-400 cursor-pointer outline-none
               rdx-disabled:cursor-not-allowed rdx-disabled:opacity-50"
              >
                Clean favorites
                {favorites.length ? (
                  <span className="rounded-md w-[18px] h-[18px] flex items-center justify-center">
                    {favorites.length}
                  </span>
                ) : null}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
};

export default SettNav;
