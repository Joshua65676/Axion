import { useEffect, useState } from "react";
import type { Tweet } from "./useFetchTweet"; 
import { parseTweetMedia } from "./parseTweetMedia";

interface BookmarkResponse {
  bookmark: Tweet[];
}

export const useFetchBookmarks = (category: string | null) => {
  const [bookmarks, setBookmarks] = useState<Tweet[]>([]);

  const fetchData = () => {
    const url = category
      ? `https://joshdev.infinityfreeapp.com/get-bookmarks.php?category=${encodeURIComponent(category)}`
      : `https://joshdev.infinityfreeapp.com/get-bookmarks.php`;

    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((data: BookmarkResponse) => {
        const enriched = data.bookmark.map((tweet) => ({
          ...tweet,
          profilePic: tweet.profile_pic || "",
          ...parseTweetMedia(tweet.media || []),
        }));

        setBookmarks(enriched);
      })
      .catch(() => setBookmarks([]));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return { bookmarks, refresh: fetchData };
};