// utils/fetchTweetById.ts
import type { Tweet } from "./useFetchTweet";
import { parseTweetMedia } from "./parseTweetMedia";
import { API_BASE_URL } from "../constants/api";

export const fetchTweetById = async (tweet_id: string): Promise<Tweet | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tweet.php?id=${tweet_id}`);
    const data = await res.json();
    console.log("Fetching tweet_id:", tweet_id);

    if (data.error) return null;

    const enriched: Tweet = {
      ...data,
      profilePic: data.profile_pic,
      ...parseTweetMedia(data.media || []),
    };
    console.log("Enriched tweet:", enriched);

    return enriched;
  } catch (err) {
    console.error("Error fetching tweet:", err);
    return null;
  }
};