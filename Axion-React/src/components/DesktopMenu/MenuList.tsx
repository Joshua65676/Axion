import React from "react";
import { MenuListItems } from "../../constants";

const MenuList: React.FC = () => {
  return (
    <section className="container max-w-6xl mx-auto w-full">
      <main className="flex flex-col gap-3">
        <div className="">
          <h3 className="text-TextColor font-semibold text-[14px]">General</h3>
        </div>

        <div className=" bg-BorderGray -ml-3 h-px"></div>

        {/* List Items */}
        <main className="flex flex-col gap-5">
          {MenuListItems.map(({ id, icons, itemsName }) => (
            <ul key={id} className="text-TextColor h-7 -ml-3">
              <li className="flex flex-row gap-4 hover:bg-BgBlue h-10 p-2.5 pl-3 rounded-2xl">
                <img src={icons} alt={itemsName} />
                <span className="text-[14px] font-semibold">{itemsName}</span>
              </li>
            </ul>
          ))}
        </main>
        <div className=" bg-BorderGray -ml-3 h-px mt-1"></div>
      </main>
    </section>
  );
};

export default MenuList;
