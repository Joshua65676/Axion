import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

const ExtensionNotInstallButton: React.FC = () => {
  return (
    <>
      <section className="">
        <Link
          to="https://chrome.google.com/webstore/detail/axion-bookmarks/mmjafioelfofijndijanalmngffniegp"
          target="_blank"
        >
          <Button className="w-[15rem] bg-BlueHover hover:bg-BookmarkText border-none">
            <span className="text-WhiteGray leading-[20px]">Install Axion Extension</span>
          </Button>
        </Link>
      </section>
    </>
  );
};

export default ExtensionNotInstallButton;