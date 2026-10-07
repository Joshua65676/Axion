import React from "react";
import { MenuListItems } from "../../constants";
import { NavLink } from "react-router-dom";
import MobileToggle from "../ui/MobileToggle";

const MenuList: React.FC = () => {
  return (
    <section className="container max-w-6xl mx-auto w-full">
      <main className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between gap-2">
          <h3 className="text-TextColor font-semibold text-[14px]">General</h3>
          <MobileToggle />
        </div>

        <div className=" bg-BorderGray -ml-3 h-px"></div>

        {/* List Items */}
        <main className="flex flex-col gap-5">
          {MenuListItems.map(({ id, icons, itemsName, path }) => (
            <ul key={id} className="text-TextColor h-7 -ml-3">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-4 h-10 p-2.5 pl-3 rounded-2xl bg-BgBlue text-"
                    : "flex flex-row gap-4 h-10 p-2.5 pl-3 rounded-2xl hover:bg-BgBlue hover:text-"
                }
              >
                <li className="flex flex-row gap-4">
                  <img src={icons} alt={itemsName} />
                  <span className="text-[14px] font-semibold">{itemsName}</span>
                </li>
              </NavLink>
            </ul>
          ))}
        </main>
        <div className="bg-BorderGray -ml-3 h-px mt-3"></div>
      </main>
    </section>
  );
};

export default MenuList;
