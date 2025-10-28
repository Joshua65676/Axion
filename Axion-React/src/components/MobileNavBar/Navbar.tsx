import React, { useEffect, useState } from "react";
import { Logo } from "../../assets";
import { Hamburger } from "../../assets";
import MobileMenu from "../MobileMenu/MobileMenu";

const MobileNavbar: React.FC = () => {
  const [stickyClass, setStickyClass] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <main className="container max-w-6xl mx-auto w-full">
        <section className="flex flex-row justify-between p-4">
          <img
            src={Logo}
            alt="Axion Logo"
            className="w-[5rem] h-[4rem] rounded-md"
          />
          <button onClick={() => setIsMenuOpen(true)}>
            <img src={Hamburger} alt="humburger icon" className="w-[30px]" />
          </button>
        </section>
        <div>
          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
        </div>
      </main>
    </nav>
  );
};

export default MobileNavbar;
