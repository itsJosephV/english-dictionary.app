// import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SettingsIcon } from "../icons/SettingsIcon";
import { GitHubIcon } from "../icons/GithubIcon";
import { useFavoriteWords } from "../context/favoriteWords/useFavoriteWordsContext";
import { useFunctionalityContext } from "../context/functionalities/useFunctionalityContext";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import FavouritesOnNav from "./FavouritesOnNav";

const SettNav = () => {
  const { cleanLocalStorage, favorites } = useFavoriteWords();
  const { isDetailsOpen, isAutoFocusEn, setIsDetailsOpen, setIsAutoFocusEn } =
    useFunctionalityContext();

  const iconStyle =
    "text-[1.3rem] text-neutral-400 hover:text-white duration-200";

  const itemStyle =
    "flex justify-between rounded-md data-[highlighted]:bg-neutral-800 duration-200 outline-none text-sm";

  return (
    <nav className="border-b px-5 border-neutral-800 ">
      <div className="max-w-[1440px] py-1.5 flex items-center mx-auto">
        <p className="font-bold text-[1.2rem] flex-1">Dictionary</p>
        <div className="flex mr-4 gap-1.5">
          <a
            href="https://github.com/itsJosephV/dictionary-app/tree/main"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className={iconStyle} />
          </a>
          <a
            href="https://www.linkedin.com/in/josephvp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className={iconStyle} />
          </a>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="flex items-center outline-none mr-1">
            <SettingsIcon className={iconStyle} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={10}
              side="bottom"
              className="min-w-[180px] bg-neutral-950/50 backdrop-blur-md rounded-md p-1.5 border border-neutral-800"
            >
              <DropdownMenu.Item
                onSelect={(e) => e.preventDefault()}
                className={itemStyle}
              >
                <label className="w-full flex justify-between items-center cursor-pointer py-1 px-1.5">
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
                className={itemStyle}
              >
                <label className="w-full flex justify-between items-center py-1 px-1.5 cursor-pointer">
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
                className="flex justify-between items-center rounded-md data-[highlighted]:bg-neutral-800 text-red-400 duration-200 outline-none text-sm
               rdx-disabled:cursor-not-allowed rdx-disabled:opacity-50 py-1 px-1.5 cursor-pointer"
              >
                Clear favorites
                {favorites.length ? (
                  <span className="rounded-md flex items-center justify-center ">
                    {favorites.length}
                  </span>
                ) : null}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        {/**
         *
         */}
        <FavouritesOnNav triggerClasses={"custom-media-nav"} />
      </div>
    </nav>
  );
};

export default SettNav;
