import React from "react";
import { Button } from "../ui/Button";

const ExtensionNotInstallButton: React.FC = () => {
  return (
    <>
      <section className="">
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

export default ExtensionNotInstallButton;
