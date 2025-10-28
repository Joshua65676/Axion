export interface ParsedMedia {
  profilePic?: string;
  tweetImages: string[];
  tweetVideos: string[];
}

export const parseTweetMedia = (media: string[]): ParsedMedia => {
  let mediaArray: string[] = [];

  if (typeof media === "string") {
    try {
      mediaArray = JSON.parse(media);
    } catch (err) {
      console.error("Invalid media format:", err, media);
    }
  } else {
    mediaArray = media;
  }


  // try {
  //   mediaArray = JSON.parse(media);
  // } catch (err) {
  //   console.error("Invalid media format:", err, media);
  // }

  return {
    profilePic: mediaArray.find((url) => url.includes("profile_images")),
    tweetImages: mediaArray.filter((url) => url.includes("media")),
    tweetVideos: mediaArray.filter((url) => url.includes("video")),
  };
};