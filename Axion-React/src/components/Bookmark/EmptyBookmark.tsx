import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const EmptyBookmark: React.FC = () => {
  return (
    <>
      <section className="flex flex-col gap-8 justify-center items-center py-10 text-center">
        <h2 className="text-TextColor text-[20px] leading-[100%] tracking-[-0.5%] font-semibold">
          Go to your Twitter Bookmarks and save them with Axion.
        </h2>
        <Link
          to="https://twitter.com/i/bookmarks"
          target="_blank"
          className="w-full max-w-[18rem]"
        >
          <Button className="w-full bg-BlueHover hover:bg-BookmarkText border-none cursor-pointer rounded-[10px] py-[10px] px-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.5%] text-WhiteGray">
            <span className="text-WhiteGray leading-[20px]">
              Open Your Twitter Bookmarks
            </span>
          </Button>
        </Link>
      </section>
    </>
  );
};

export default EmptyBookmark;
