import React from "react";
import { Button } from "../ui/Button";

const ExtensionNotInstall: React.FC = () => {
  return (
    <>
      <section className="flex flex-col gap-8 justify-center items-center py-10 text-center">
        <h2 className="text-TextColor text-[20px] leading-[100%] tracking-[-0.5%] font-semibold">
          Install the Axion Extension to start saving bookmarks.
        </h2>
        <Button
          asChild
          className="w-[15rem] bg-BlueHover hover:bg-BookmarkText border-none cursor-pointer rounded-[10px] py-[10px] px-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.5%] text-WhiteGray"
        >
          <a href="/axion-extension.zip" download="axion-extension.zip">
            <span className="text-WhiteGray leading-[20px]">
              Install Axion Extension
            </span>
          </a>
        </Button>
      </section>
    </>
  );
};

export default ExtensionNotInstall;
