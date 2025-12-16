import React from "react";
import { useFetchBookmarks } from "../../utils/FetchBookmarks";
import View from "../ui/View";
import EmptyBookmark from "./EmptyBookmark";
import categoryColors from "../../utils/categoryColors";
import { formatTimeAgo } from "../../utils/timeAgo";
import { shortenText } from "../../utils/shortenText";
import { Time } from "../../assets";
import MarkBookmark from "../ui/MarkBookmark";

const BookmarksScreen: React.FC = () => {
  const { bookmarks, loading } = useFetchBookmarks();

  if (loading) return <div>Loading bookmarks...</div>;
  if (bookmarks.length === 0) return <EmptyBookmark />;

  return (
    <div className="flex flex-col justify-between gap-3">
      <div className="lg:hidden flex">
        <span className="text-Black font-medium text-[16px] leading-[20px] tracking-0">
          Bookmarks
        </span>
      </div>
      <>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[385px] lg:w-full">
          {bookmarks.map((bm, i) => {
            return (
              <li key={i} className="bg-WhiteGray p-[20px] rounded-[30px] min-h-[100px] flex flex-col justify-between">
                <main className="flex flex-col gap-3">
                  <span
                    className={`text-[12px] font-medium text-center w-[7rem] h-[28px] p-[5px] rounded-[20px] ${
                      categoryColors[bm.category?.toLowerCase()] ||
                      categoryColors.default
                    }`}
                  >
                    {bm.category}
                  </span>
                  <div className="flex justify-between">
                    <span className="text-[12px] text-TextGray font-medium">
                      Bookmarked:
                    </span>
                    <span className="flex text-TextGray text-[14px]">
                      <img src={Time} alt="timeicon" />
                      {formatTimeAgo(bm.created_at)}
                    </span>
                  </div>
                  <div className="flex gap-3 text-center items-center">
                    {bm.profilePic && (
                      <img
                        src={bm.profilePic}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <span className="text-[14px] text-TextGray">
                      @{bm.username}
                    </span>
                  </div>
                  <div>
                    <span className="text-[16px] text-TextGray leading-[25px] tracking-[-0.5px] font-medium">
                      {shortenText(bm.tweet_text, 100)}
                    </span>
                  </div>

                  {(() => {
                    const hasImages =
                      Array.isArray(bm.tweetImages) &&
                      bm.tweetImages.length > 0;
                    const hasVideos =
                      Array.isArray(bm.tweetVideos) &&
                      bm.tweetVideos.length > 0;

                    if (hasImages && hasVideos) {
                      return (
                        <div className="flex gap-2">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            {(bm.tweetImages || []).map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Tweet image ${index + 1}`}
                                className="w-full h-auto rounded-md"
                              />
                            ))}
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            {(bm.tweetVideos || []).map((url, index) => (
                              <video
                                key={index}
                                src={url}
                                controls
                                loop
                                autoPlay
                                muted
                                playsInline
                                className="w-full rounded-md"
                              />
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (hasImages) {
                      return bm.tweetImages.length === 1 ? (
                        <img
                          src={bm.tweetImages[0]}
                          alt="Tweet image"
                          className="w-full h-auto rounded-md"
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {(bm.tweetImages || []).map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`Tweet image ${index + 1}`}
                              className="w-full h-auto rounded-md"
                            />
                          ))}
                        </div>
                      );
                    }

                    if (hasVideos) {
                      return (
                        <div className="flex flex-col gap-2">
                          {(bm.tweetVideos || []).map((url, index) => (
                            <video
                              key={index}
                              src={url}
                              loop
                              autoPlay
                              muted
                              playsInline
                              controls
                              className="w-full rounded-md"
                            />
                          ))}
                        </div>
                      );
                    }

                    return null;
                  })()}

                  <div className="bg-BorderGray h-px"></div>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    <View tweet={bm} />
                    <MarkBookmark />
                  </div>
                </main>
              </li>
            );
          })}
        </ul>
      </>
    </div>
  );
};

export default BookmarksScreen;
