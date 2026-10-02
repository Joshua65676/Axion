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
    <section className="w-full text-center">
      <main className="flex w-full flex-row items-center justify-between gap-2 text-center sm:gap-4">
        <div className="relative min-w-0 flex-1 lg:max-w-2xl">
          <img
            src={Vector}
            alt="search icon"
            className="absolute left-5 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search bookmarks"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => navigate("/search")}
            onKeyDown={handleKeyDown}
            className="h-12 w-full min-w-0 rounded-full border border-SearchGray bg-WhiteGray py-2 pl-12 pr-4 text-Black focus:outline-none focus:ring-2 focus:ring-SearchGray sm:h-[55px] sm:pl-14"
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
