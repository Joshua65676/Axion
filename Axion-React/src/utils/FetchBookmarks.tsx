import { useEffect, useState } from "react";

export interface Bookmark {
  tweet_id: string;
  tweet_text: string;
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
}

export function useFetchBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) return;

    fetch(`http://localhost/axion/Axion-PHP/get-bookmarks.php?user_id=${user_id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBookmarks(data.bookmarks || []);
        setLoading(false);
        if(Array.isArray(data.bookmarks)) {
          setBookmarkCount(data.bookmarks.length);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch bookmarks:", err);
        setLoading(false);
      });
  }, []);

  return { bookmarks, loading, bookmarkCount };
}