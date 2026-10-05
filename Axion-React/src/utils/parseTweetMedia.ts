export interface ParsedMedia {
  profilePic?: string;
  tweetImages: string[];
  tweetVideos: string[];
}

function parseUrlList(value: string[] | string | null | undefined): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter((url): url is string => typeof url === "string");
  } catch {
    return [value];
  }

  return [value];
}

export const parseTweetMedia = (
  media: string[] | string | null | undefined,
  video?: string[] | string | null,
): ParsedMedia => {
  const mediaArray = parseUrlList(media);
  const videoArray = parseUrlList(video);
  const isVideoUrl = (url: string) =>
    /tweet_video|video\.twimg\.com|\.mp4(?:[?#]|$)|\.m3u8(?:[?#]|$)/i.test(url);
  const uniqueVideos = [...mediaArray.filter(isVideoUrl), ...videoArray].filter(
    (url, index, urls) => urls.indexOf(url) === index,
  );

  return {
    profilePic: mediaArray.find((url) => url.includes("profile_images")),
    tweetImages: mediaArray.filter(
      (url) => url.includes("/media/") && !url.includes("profile_images") && !isVideoUrl(url),
    ),
    tweetVideos: uniqueVideos,
  };
};