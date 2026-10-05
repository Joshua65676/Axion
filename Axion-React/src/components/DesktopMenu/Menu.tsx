import React from "react";
import DesktopLogo from "./DesktopLogo";
import Hambugar from "./Hambuga";
import MenuList from "./MenuList";
import UpgradePlan from "../Account/UpgradePlan";
import Account from "../Account/Account";

const Menu: React.FC = () => {
  return (
    <section className="fixed inset-y-0 left-0 z-30 hidden h-screen w-[18.8rem] lg:flex">
      <main className="relative flex h-full w-full flex-col gap-5 px-6 pt-12">
        {/* Logo and Icon */}
        <main className="relative flex flex-row justify-between">
          <div className="flex flex-row gap-30 items-center">
            <DesktopLogo />
            <Hambugar />
          </div>
        </main>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-BorderGray"></div>
        {/* Menu List */}
        <main>
          <MenuList />
        </main>
        {/* Upgrade Plan */}
        <main>
          <UpgradePlan />
        </main>
        {/* Account */}
        <main>
          <Account />
        </main>
      </main>
    </section>
  );
};

export default Menu;
