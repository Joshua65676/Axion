import { useCallback, useEffect, useState } from "react";
import type { Tweet } from "./useFetchTweet"; 
import { parseTweetMedia } from "./parseTweetMedia";
import { API_BASE_URL } from "../constants/api";

interface BookmarkResponse {
  bookmark: Tweet[];
}

export const useFetchBookmarks = (category: string | null) => {
  const [bookmarks, setBookmarks] = useState<Tweet[]>([]);

  const fetchData = useCallback(() => {
    const url = category
      ? `${API_BASE_URL}/get-bookmarks.php?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/get-bookmarks.php`;

    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((data: BookmarkResponse) => {
        const enriched = data.bookmark.map((tweet) => {
          const parsedMedia = parseTweetMedia(tweet.media || []);
          return {
            ...tweet,
            ...parsedMedia,
            profilePic: tweet.profile_pic || parsedMedia.profilePic || "",
          };
        });

        setBookmarks(enriched);
      })
      .catch(() => setBookmarks([]));
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { bookmarks, refresh: fetchData };
};