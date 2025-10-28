import { useEffect, useState } from "react";
import { parseTweetMedia } from "./parseTweetMedia";

export interface Tweet {
  tweet_id: number;
  username: string;
  tweet_text: string;
  tweet_url: string;
  category: string;
  created_at: string;
  profile_pic: string;
  media: string[];
  video: string;
  likes: number;
  retweets: number;
  comments: number;
  is_verified: boolean;
  profilePic?: string;
  tweetImages?: string[];
  tweetVideos?: string[];
}

export const useFetchTweet = (tweet_id: string | undefined) => {
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tweet_id) return;

    fetch(`http://localhost/axion/Axion-PHP/api/tweet.php?id=${tweet_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setTweet(null);
        } else {
          const enriched = {
            ...data,
            profilePic: data.profile_pic,
            ...parseTweetMedia(data.media),
          };
          setTweet(enriched);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setTweet(null);
      });
  }, [tweet_id]);

  return { tweet, loading };
};