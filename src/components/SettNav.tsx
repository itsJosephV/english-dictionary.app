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
  const { settings, setSettings } = useFunctionalityContext();

  const iconStyle =
    "text-[1.3rem] text-neutral-400 hover:text-white duration-200";

  const itemStyle =
    "flex justify-between rounded-md data-[highlighted]:bg-neutral-800 duration-200 outline-none text-sm";

  return (
    <nav className="border-b border-neutral-800 px-5 ">
      <div className="mx-auto flex max-w-[1440px] items-center py-1.5">
        <p className="flex-1 text-[1.2rem] font-semibold">Dictionary</p>
        <div className="mr-4 flex gap-1.5">
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
          <DropdownMenu.Trigger className="mr-1 flex items-center outline-none">
            <SettingsIcon className={iconStyle} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={10}
              side="bottom"
              className="min-w-[180px] rounded-md border border-neutral-800 bg-neutral-950/50 p-1.5 backdrop-blur-md"
            >
              <DropdownMenu.Item
                onSelect={(e) => e.preventDefault()}
                className={itemStyle}
              >
                <label className="flex w-full cursor-pointer items-center justify-between px-1.5 py-1">
                  Autofocus
                  <input
                    readOnly
                    type="checkbox"
                    onChange={() =>
                      setSettings((prevState) => ({
                        ...prevState,
                        autofocus: !prevState.autofocus,
                      }))
                    }
                    checked={settings.autofocus}
                  />
                </label>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={(e) => e.preventDefault()}
                className={itemStyle}
              >
                <label className="flex w-full cursor-pointer items-center justify-between px-1.5 py-1">
                  Details
                  <input
                    readOnly
                    type="checkbox"
                    onChange={() =>
                      setSettings((prevState) => ({
                        ...prevState,
                        details: !prevState.details,
                      }))
                    }
                    checked={settings.details}
                  />
                </label>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => cleanLocalStorage()}
                disabled={!favorites.length}
                className="flex cursor-pointer items-center justify-between rounded-md px-1.5 py-1 text-sm text-red-400
               outline-none duration-200 data-[highlighted]:bg-neutral-800 rdx-disabled:cursor-not-allowed rdx-disabled:opacity-50"
              >
                Clear favourites
                {favorites.length ? (
                  <span className="flex items-center justify-center rounded-md ">
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
