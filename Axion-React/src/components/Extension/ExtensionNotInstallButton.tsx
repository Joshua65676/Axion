import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const ExtensionNotInstallButton: React.FC = () => {
  return (
    <>
      <section className="flex items-center gap-3">
        <Button
          asChild
          className="w-[15rem] bg-BlueHover hover:bg-BookmarkText border-none cursor-pointer rounded-[10px] py-[10px] px-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.5%] text-WhiteGray"
        >
          <Link to="/extension-setup">
            <span className="text-WhiteGray leading-[20px]">Install guide</span>
          </Link>
        </Button>
      </section>
    </>
  );
};

export default ExtensionNotInstallButton;
