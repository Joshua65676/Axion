import React from "react";
import { Filter } from "../../assets";

const MobileFilter: React.FC = () => {
  return (
    <main>
      <section>
        <button className="border bg-WhiteGray border-SearchGray rounded-full w-[55px] h-[55px] flex justify-center items-center">
          <img src={Filter} alt="filter icon" />
        </button>
      </section>
    </main>
  );
};

export default MobileFilter;
