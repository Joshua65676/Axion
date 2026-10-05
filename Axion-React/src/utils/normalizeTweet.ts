import type { Tweet } from "./useFetchTweet";
import { parseTweetMedia } from "./parseTweetMedia";

function usernameFromUrl(tweetUrl: string): string {
  try {
    const segments = new URL(tweetUrl).pathname.split("/").filter(Boolean);
    return segments[0] && segments[0] !== "i" ? segments[0] : "";
  } catch {
    return "";
  }
}

export function normalizeTweet(tweet: Tweet): Tweet {
  const parsedMedia = parseTweetMedia(tweet.media, tweet.video);
  const username = tweet.username?.trim().replace(/^@/, "") || usernameFromUrl(tweet.tweet_url);

  return {
    ...tweet,
    ...parsedMedia,
    username,
    profilePic: tweet.profile_pic?.trim() || parsedMedia.profilePic || "",
  };
}
