import React, { useEffect, useState } from "react";
import EmptyBookmark from "../components/Bookmark/EmptyBookmark";

export interface Bookmark {
  tweet_text: string
}

 export function useFetchBookmarks() {
  const [bookmarksUI, setBookmarksUI] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    fetch("http://localhost/axion/Axion-PHP/get-bookmarks.php", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        const bookmarks = data.bookmarks || [];

        if (bookmarks.length === 0) {
          setBookmarksUI(
            <>
             <EmptyBookmark />
            </>
          );
        } else {
          setBookmarksUI(
            <div>
              <h2 className="text-xl font-semibold text-Black">Your Bookmarks</h2>
              <ul className="list-disc pl-6 space-y-1">
                {bookmarks.map((bm: Bookmark, i: number) => (
                  <li key={i} className="text-TextColor">{bm.tweet_text}</li>
                ))}
              </ul>
            </div>
          );
        }
      })
      .catch(() => {
        setBookmarksUI(<div className="text-red-500">Failed to load bookmarks.</div>);
      });
  }, []);

  return bookmarksUI;
}