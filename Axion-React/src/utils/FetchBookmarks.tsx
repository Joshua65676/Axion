import { useEffect, useState } from "react";
import { parseTweetMedia } from "./parseTweetMedia";

export interface Bookmark {
  tweet_id: string;
  tweet_text: string;
  tweet_url: string;
  username: string;
  profile_pic: string;
  media: string[];
  video: string;
  likes: string;
  retweets: string;
  comments: string;
  views: string;
  stickers: string[];
  is_verified: boolean;
  category: string;
  created_at: string;
  profilePic?: string;
  tweetImages?: string[];
  tweetVideos?: string[];
}

export function useFetchBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) return;

    fetch(
      `http://localhost/axion/Axion-PHP/get-bookmarks.php?user_id=${user_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        const enriched = Array.isArray(data.bookmark)
          ? data.bookmark.map((tweet: Bookmark) => ({
              ...tweet,
              ...parseTweetMedia(tweet.media),
            }))
          : [];

        setBookmarks(enriched);
        setLoading(false);
        setBookmarkCount(enriched.length);

        // setBookmarks(data.bookmark || []);
        // setLoading(false);
        // if(Array.isArray(data.bookmark)) {
        //   setBookmarkCount(data.bookmark.length);
        // }
      })
      .catch((err) => {
        console.error("Failed to fetch bookmarks:", err);
        setLoading(false);
      });
  }, []);

  return { bookmarks, loading, bookmarkCount };
}
