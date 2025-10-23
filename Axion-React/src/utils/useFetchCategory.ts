import { useEffect, useState } from "react";
import type { Tweet } from "./useFetchTweet";

export const useFetchBookmarks = (category: string | null) => {
  const [bookmarks, setBookmarks] = useState<Tweet[]>([]);

  const fetchData = () => {
    const url = category
      ? `http://localhost/axion/Axion-PHP/get-bookmarks.php?category=${encodeURIComponent(category)}`
      : `http://localhost/axion/Axion-PHP/get-bookmarks.php`;

    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBookmarks(data.bookmarks))
      .catch(() => setBookmarks([]));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return { bookmarks, refresh: fetchData };
};