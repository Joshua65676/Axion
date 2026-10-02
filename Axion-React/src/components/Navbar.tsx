import React from "react";
import { useState, useEffect } from "react";
import SearchButton from "./ui/SearchButton";
import Notification from "./ui/Notification";
import ConnectExtension from "./Extension/ConnectExtension";

const Navbar: React.FC = () => {
  const [stickyClass, setStickyClass] = useState<boolean>(false);

  const stickNavbar = () => {
    const windowHeight = window.scrollY;
    setStickyClass(windowHeight > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-[18.8rem] right-0 z-50  ${
        stickyClass
          ? "bg-GrayBg backdrop-blur-sm border border-slate-300 shadow-md"
          : ""
      }`}
    >
      <section className="w-full">
        <main className="relative flex w-full items-center gap-4 px-4 py-3">
          <div className="min-w-0 flex-1">
            <SearchButton />
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Notification />
            <ConnectExtension />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-BorderGray"></div>
        </main>
      </section>
    </nav>
  );
};

export default Navbar;
