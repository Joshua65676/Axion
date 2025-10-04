import React from "react";
import DesktopLogo from "./DesktopLogo";
import Hambugar from "./Hambuga";
import MenuList from "./MenuList";
import UpgradePlan from "../Account/UpgradePlan";
import Account from "../Account/Account";

const Menu: React.FC = () => {
  return (
    <section className="container max-w-6xl mx-auto w-full p-4 px-10 fixed left-0 top-0 h-screen z-60">
      <main className="flex flex-col absolute top-12 gap-5">
        {/* Logo and Icon */}
        <main className="flex flex-row justify-between ">
          <div className="flex flex-row gap-30 items-center">
            <DesktopLogo />
            <Hambugar />
          </div>
          <div className="bg-BorderGray h-screen w-px absolute left-13/12 -top-12 bottom-0"></div>
        </main>
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
