import React, { useState, useEffect } from "react";
import { checkExtensionInstalled } from "../utils/extension";
import { Unread, BookmarkBold } from "../assets";
import BookmarkFilter from "./Bookmark/BookmarkFilter";
import ExtensionNotInstall from "./Extension/ExtensionNotInstall";
import BookmarksScreen from "./Bookmark/BookmarkScreen";
import { useFetchBookmarks } from "../utils/FetchBookmarks";
import SearchButton from "./ui/SearchButton";

const Home: React.FC = () => {
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { bookmarkCount } = useFetchBookmarks();

  useEffect(() => {
    checkExtensionInstalled().then((installed) => {
      setExtensionInstalled(installed);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="text-Black  flex justify-center items-center text-center">
        Loading...
      </div>
    );

  return (
    <main className="container max-w-6xl mx-auto w-full">
      <section className="flex flex-col gap-10">
        <main className="flex flex-col gap-[32px]">
          <div className="">
            <h2 className="text-[16px] font-medium leading-[20px] tracking-[0px] text-Black">
              Today bookmarks
            </h2>
            <span className="text-[10px] font-normal leading-[10px] tracking-[0px] text-TextColor">
              Your saved tweets revisited
            </span>
          </div>

          <section className="lg:hidden flex">
            <SearchButton />
          </section>

          <section className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="flex min-w-0 flex-col gap-3 rounded-3xl border border-UnreadText bg-UnreadBg p-4 sm:min-h-[143px] sm:p-5">
              <div className="flex flex-row gap-[3px]">
                <img src={Unread} alt="unread icon" />
                <span className="text-[12px] font-normal leading-[125%] tracking-[-0.5%] text-UnreadText">
                  Unread
                </span>
              </div>
              <span className="text-[32px] font-normal leading-[100%] tracking-[-0.5%] text-Black">
                0
              </span>
            </div>

            <div className="flex min-w-0 flex-col gap-3 rounded-3xl border border-BgBlue bg-BgParagraph p-4 sm:min-h-[143px] sm:p-5">
              <div className="flex flex-row gap-[3px]">
                <img src={BookmarkBold} alt="bookmark icon" />
                <span className="text-[14px] font-normal leading-[125%] tracking-[-0.5%] text-BgBlue">
                  Bookmarks
                </span>
              </div>
              <span className="text-[32px] font-normal leading-[100%] tracking-[-0.5%] text-Black">
                {bookmarkCount}
              </span>
            </div>
          </section>
        </main>

        <section className="hidden lg:flex">
          <BookmarkFilter />
        </section>

        {!extensionInstalled ? (
          <div className="">
            <ExtensionNotInstall />
          </div>
        ) : (
          <BookmarksScreen />
        )}
      </section>
    </main>
  );
};

export default Home;
