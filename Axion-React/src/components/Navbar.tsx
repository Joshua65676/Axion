import React from "react";
import { useState, useEffect } from "react";
import SearchButton from "./ui/SearchButton";
import Notification from "./ui/Notification";

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
      className={`fixed top-0 left-0 right-0 z-50  ${
        stickyClass
          ? "bg-GrayBg backdrop-blur-sm border border-slate-300 shadow-md"
          : ""
      }`}
    >
      <section className="container max-w-6xl mx-auto w-full">
        <main className="pl-40 p-4 flex flex-row justify-between">
          <div className="flex flex-row justify-between container max-w-6xl mx-auto w-full">
            <SearchButton />
            <div className="">
              <Notification />
            </div>
          </div>
          <div className="absolute bg-BorderGray left-[18.8rem] right-0 top-[5rem] h-px"></div>
        </main>
      </section>
    </nav>
  );
};

export default Navbar;
