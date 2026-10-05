import React from "react";
import { Button } from "../ui/Button";

const EmptyBookmark: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10 text-center">
      <h2 className="text-[20px] font-semibold leading-[100%] tracking-[-0.5%] text-TextColor">
        Go to your Twitter Bookmarks and save them with Axion.
      </h2>

      <div className="relative z-10 flex w-full justify-center">
        <Button
          asChild
          className="w-full max-w-[18rem] bg-BlueHover hover:bg-BookmarkText border-none cursor-pointer rounded-[10px] py-[10px] px-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.5%] text-WhiteGray"
        >
          <a
            href="https://twitter.com/i/bookmarks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center"
          >
            <span className="text-WhiteGray leading-[20px]">
              Open Your Twitter Bookmarks
            </span>
          </a>
        </Button>
      </div>
    </section>
  );
};

export default EmptyBookmark;
