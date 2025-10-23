import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

const ExtensionNotInstall: React.FC = () => {
  return (
    <>
      <section className="flex flex-col gap-8 justify-center items-center py-10">
        <h2 className="text-TextColor text-[20px] leading-[100%] tracking-[-0.5%] font-semibold">
          Install the Axion Extension to start saving bookmarks.
        </h2>
        <Link
          to="https://chrome.google.com/webstore/detail/axion-bookmarks/mmjafioelfofijndijanalmngffniegp"
          target="_blank"
          className=""
        >
          <Button className="w-[15rem] bg-BlueHover hover:bg-BookmarkText border-none">
            <span className="text-WhiteGray leading-[20px]">Install Axion Extension</span>
          </Button>
        </Link>
      </section>
    </>
  );
};

export default ExtensionNotInstall;