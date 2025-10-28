import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../ui/BackButton";
import { useFetchTweet } from "../../utils/useFetchTweet";
import categoryColors from "../../utils/categoryColors";
import { formatTimeAgo } from "../../utils/timeAgo";
import { Time } from "../../assets";
import MarkBookmark2 from "../ui/MarkBookmark2";
import TwitterLink from "../ui/TwitterLink";

const TweetDetails = () => {
  const { tweet_id } = useParams();
  const navigate = useNavigate();
  const { tweet, loading } = useFetchTweet(tweet_id);

  if (loading) return <div className="p-6">Loading tweet...</div>;
  if (!tweet) return <div className="p-6">Tweet not found.</div>;

  return (
    <main className="container max-w-6xl w-full mx-auto -mt-[5re]">
      <section className="flex flex-col gap-2 -ml-4">
        {/* Back button */}
        <div className="">
          <BackButton onClick={() => navigate(-1)} />
        </div>
        {/* Main Details */}

        <main className="py-[20px] px-[30px]">
          <section className="flex flex-col justify-between gap-6 p-[20px] bg-WhiteGray rounded-[30px]">
            {/* Category */}
            <div>
              <span
                className={`text-[12px] font-medium text-center w-[7rem] h-[28px] p-[5px] rounded-[20px] ${
                  categoryColors[tweet.category?.toLowerCase()] ||
                  categoryColors.default
                }`}
              >
                {tweet.category}
              </span>
            </div>
            {/* Time  */}
            <div className="flex justify-between">
              <span className="text-[12px] text-TextGray font-medium">
                Bookmarked:
              </span>
              <span className="flex text-TextGray text-[14px]">
                <img src={Time} alt="timeicon" />
                {formatTimeAgo(tweet.created_at)}
              </span>
            </div>
            {/* Profile Pics and username */}
            <div className="flex items-center gap-3">
              {tweet.profilePic && (
                <img
                  src={tweet.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mb-2"
                />
              )}
              {tweet.is_verified && <span className="text-blue-500">✔️</span>}
              <span className="text-[14px] text-TextGray">
                @{tweet.username}
              </span>
            </div>
            {/* Text */}
            <div>
              <p className="text-[16px] text-TextGray leading-[25px] tracking-[-0.5px] font-medium">
                {tweet.tweet_text}
              </p>
            </div>
            {/* Time, View, Likes, Repost */}
            <div className="flex flex-col gap-3">
              {/* Time and View */}
              <div className="flex flex-row gap-3">
                <span className="text-[16px] text-ParagraphGray">
                  {tweet.created_at}.
                </span>
                <span className="">
                  {}
                  <span className="text-[16px] text-Black font-semibold">
                    View
                  </span>
                </span>
              </div>
              {/* Line */}
              <div className="bg-BorderGray h-px"></div>
              <div className="flex flex-row gap-4">
                <span className="text-Black text-[14px] font-semibold">
                  {tweet.retweets}{" "}
                  <span className="text-ParagraphGray font-normal">Repost</span>
                </span>
                <span className="text-Black text-[14px] font-semibold">
                  {tweet.likes}{" "}
                  <span className="text-ParagraphGray font-normal">Likes</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {/* Line */}
              <div className="bg-BorderGray h-px"></div>
              {/* Buttons */}
              <div className="flex flex-row gap-8">
                <MarkBookmark2 />
                <TwitterLink url={tweet.tweet_url} />
              </div>
            </div>
          </section>
        </main>
      </section>
    </main>
  );
};

export default TweetDetails;
