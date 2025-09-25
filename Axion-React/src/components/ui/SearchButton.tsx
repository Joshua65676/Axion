import React from "react";
import { Vector } from "../../assets";

const SearchButton: React.FC = () => {
  return (
    <section>
      <main>
        <div className="relative w-[50rem] max-w-md">
          <img src={Vector} alt="search icon" className="absolute left-5 top-1/2 transform -translate-y-1/2" />
          <input type="text" placeholder="Search bookmarks..." className="pl-15 pr-5 py-2 w-full border bg-WhiteGray border-SearchGray rounded-full focus:outline-none focus:ring-2 focus:ring-SearchGray text-Black" />
        </div>
      </main>
    </section>
  );
};

export default SearchButton;
