import React, { useState, useEffect } from "react";
import BookmarkFilter from "./Bookmark/BookmarkFilter";
import BookmarksScreen from "./Bookmark/BookmarkScreen";
import SearchResults from "./Search/SearchResults";
import { useParams, useNavigate } from "react-router-dom";
import { useSearchTweets } from "../utils/useSearchTweets";

const Search: React.FC = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { results, loading } = useSearchTweets(keyword);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost/axion/Axion-PHP/get_search_history.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPreviousSearches(data))
      .catch(() => setPreviousSearches([]));
  }, [keyword]);

  if (loading)
    return (
      <div className="text-Black  flex justify-center items-center text-center">
        Loading...
      </div>
    );

  return (
    <main className="container max-w-6xl mx-auto w-full">
      <section className="flex flex-col gap-10">
        {!keyword && (
          <main className="flex flex-col gap-12">
            {/* Previous Searches */}
            <div className="">
              <h2 className="text-[16px] text-Black font-medium leading-[20px] tracking-0">‘’Previous search’’</h2>
              <ul className="mb-6 space-y-2">
                {previousSearches.map((term, i) => (
                  <li
                    key={i}
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/search/${term}`)}
                  >
                    {term}
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter */}
            <section>
              <BookmarkFilter />
            </section>

            {/* All Bookmarks */}
            <>
              <BookmarksScreen />
            </>
          </main>
        )}

        {/* Search Results */}
        {keyword && (
          <main className="flex flex-col gap-12">
            <h2 className="text-xl font-medium leading-[20px] tracking-0 text-Black">
              ‘’Results for {keyword}’’
            </h2>
            <>
              <BookmarkFilter />
            </>
            <>
              <SearchResults results={results} loading={loading} />
            </>
          </main>
        )}
      </section>
    </main>
  );
};

export default Search;
