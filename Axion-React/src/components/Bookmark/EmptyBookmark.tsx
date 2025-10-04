import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const EmptyBookmark: React.FC = () => {
  return (
    <>
      <section className="flex flex-col gap-8 justify-center items-center py-10">
        <h2 className="text-TextColor text-[20px] leading-[100%] tracking-[-0.5%] font-semibold">
          Go to your Twitter Bookmarks and save them with Axion.
        </h2>
        <Link to="https://twitter.com/i/bookmarks" target="_blank" className="">
          <Button className="w-[18rem] bg-BlueHover hover:bg-BookmarkText">
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
