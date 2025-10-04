import React, { useState, useEffect } from "react";
import { checkExtensionInstalled } from "../utils/extension";
import { Unread, BookmarkBold } from "../assets";
import BookmarkFilter from "./Bookmark/BookmarkFilter";
import ExtensionNotInstall from "./Bookmark/ExtensionNotInstall";
import { useFetchBookmarks } from "../utils/FetchBookmarks";

const Home: React.FC = () => {
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [loading, setLoading] = useState(true);
  const bookmarksUI = useFetchBookmarks();

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

          <section className="flex flex-row gap-10">
            <div className="flex flex-col w-[313px] h-[143px] border border-UnreadText rounded-3xl p-[20px] gap-3 bg-UnreadBg">
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

            <div className="flex flex-col w-[313px] h-[143px] border border-BookmarkText rounded-3xl p-[20px] gap-3 bg-BookmarkBg">
              <div className="flex flex-row gap-[3px]">
                <img src={BookmarkBold} alt="bookmark icon" />
                <span className="text-[14px] font-normal leading-[125%] tracking-[-0.5%] text-BookmarkText">
                  Bookmarks
                </span>
              </div>
              <span className="text-[32px] font-normal leading-[100%] tracking-[-0.5%] text-Black">
                0
              </span>
            </div>
          </section>
        </main>

        <section>
          <BookmarkFilter />
        </section>

        {!extensionInstalled ? (
          <div className="">
            <ExtensionNotInstall />
            {/* <EmptyBookmark /> */}
          </div>
        ) : (
          bookmarksUI
        )}
      </section>
    </main>
  );
};

export default Home;
