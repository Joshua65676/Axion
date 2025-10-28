import React, { useState } from "react";
import { Vector } from "../../assets";
import { useNavigate } from "react-router-dom";
import MobileFilter from "../Filter/MobileFilter";

const SearchButton: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search/${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <section>
      <main className="flex flex-row text-center justify-between items-center gap-5">
        <div className="relative lg:w-[50rem] max-w-md">
          <img
            src={Vector}
            alt="search icon"
            className="absolute left-5 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search bookmarks by username or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => navigate("/search")}
            onKeyDown={handleKeyDown}
            className="pl-15 pr-5 py-2 lg:w-full lg:h- w-[300px] h-[55px] border bg-WhiteGray border-SearchGray rounded-full focus:outline-none focus:ring-2 focus:ring-SearchGray text-Black"
          />
        </div>

        <div className="flex lg:hidden">
          <MobileFilter />
        </div>
      </main>
    </section>
  );
};

export default SearchButton;
