import React from "react";
import BookmarkFilter from "./Bookmark/BookmarkFilter";
import { useCategories } from "../utils/useCategories";
import { useFetchBookmarks } from "../utils/useFetchCategory";
import EditCategory from "./ui/EditButton";
import { useNavigate, useParams } from "react-router-dom";
import View from "./ui/View";
import MarkBookmark from "./ui/MarkBookmark";
import { Time } from "../assets";
import { formatTimeAgo } from "../utils/timeAgo";
import { shortenText } from "../utils/shortenText";
import categoryColors from "../utils/categoryColors";
import SearchButton from "./ui/SearchButton";

const Category: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const categories = useCategories();
  const selectedCategory = name || null;
  const { bookmarks, refresh } = useFetchBookmarks(selectedCategory);
  const navigate = useNavigate();

  return (
    <main className="container max-w-6xl mx-auto w-full">
      <section className="flex flex-col gap-10">
        <section className="flex lg:hidden">
          <SearchButton />
        </section>
        <div className="flex flex-col justify-between gap-5">
          <div className="flex flex-row justify-between items-center text-center">
            <span className="text-lg text-Black leading-[20px] tracking-0 font-medium">
              Category
            </span>

            <button
              className={`px-3 py-1 rounded hidden lg:flex ${
                selectedCategory === null
                  ? "bg-BgBlue text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => navigate("/category")}
            >
              All
            </button>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {selectedCategory ? (
              <div className="bg-default text-BgBlue text-[14px] text-center py-[10px] px-[12px] font-medium leading-[125%] tracking-[-0.5%] border border-BgBlue rounded-[20px] w-[8rem] h-[40px]">
                {selectedCategory}
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-Black"
                        : "bg-White border border-BorderGray"
                    }`}
                    onClick={() => navigate(`/category/${cat}`)}
                  >
                    <span className="text-[14px] text-Black font-medium leading-[125%] tracking-[-0.5%]">
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <section className="lg:flex hidden">
          <BookmarkFilter />
        </section>

        <div className="lg:hidden flex">
          <button
            className={`px-3 py-1 rounded-full fixed bottom-10 right-5 w-[60px] h-[60px] ${
              selectedCategory === null ? "bg-BgBlue text-white" : "bg-gray-200"
            }`}
            onClick={() => navigate("/category")}
          >
            All
          </button>
        </div>

        {bookmarks.length === 0 ? (
          <p className="text-black text-center">no bookmarks found</p>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-[385px] lg:w-full">
            {bookmarks.map((tweet) => {
              return (
                <li
                  key={tweet.tweet_id}
                  className="bg-WhiteGray p-[20px] rounded-[30px]"
                >
                  <main className="flex flex-col gap-3">
                    <span
                      className={`text-[12px] font-medium text-center w-[7rem] h-[28px] p-[5px] rounded-[20px] ${
                        categoryColors[tweet.category?.toLowerCase()] ||
                        categoryColors.default
                      }`}
                    >
                      <EditCategory
                        tweet_id={tweet.tweet_id}
                        currentCategory={tweet.category}
                        onUpdated={refresh}
                      />
                    </span>
                    <div className="flex justify-between">
                      <span className="text-[12px] text-TextGray font-medium">
                        Bookmarked:
                      </span>
                      <span className="flex text-TextGray text-[14px]">
                        <img src={Time} alt="timeicon" />
                        {formatTimeAgo(tweet.created_at)}
                      </span>
                    </div>
                    <div className="flex gap-3 text-center items-center">
                      {tweet.profilePic && (
                        <img
                          src={tweet.profilePic}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <span className="text-[14px] text-TextGray">
                        @{tweet.username}
                      </span>
                    </div>
                    <div>
                      <span className="text-[16px] text-TextGray leading-[25px] tracking-[-0.5px] font-medium">
                        {shortenText(tweet.tweet_text, 100)}
                      </span>
                    </div>

                    {(() => {
                      const hasImages =
                        Array.isArray(tweet.tweetImages) &&
                        tweet.tweetImages.length > 0;
                      const hasVideos =
                        Array.isArray(tweet.tweetVideos) &&
                        tweet.tweetVideos.length > 0;

                      if (hasImages && hasVideos) {
                        return (
                          <div className="flex gap-2">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              {(tweet.tweetImages || []).map((url, index) => (
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Tweet image ${index + 1}`}
                                  className="w-full h-auto rounded-md"
                                />
                              ))}
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                              {(tweet.tweetVideos || []).map((url, index) => (
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
                        return tweet.tweetImages.length === 1 ? (
                          <img
                            src={tweet.tweetImages[0]}
                            alt="Tweet image"
                            className="w-full h-auto rounded-md"
                          />
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {(tweet.tweetImages || []).map((url, index) => (
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
                            {(tweet.tweetVideos || []).map((url, index) => (
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
                    <div className="flex flex-row gap-3">
                      <View tweet={tweet} />
                      <MarkBookmark />
                    </div>
                  </main>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Category;
