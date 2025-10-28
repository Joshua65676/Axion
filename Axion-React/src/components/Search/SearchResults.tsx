import { Time } from "../../assets";
import categoryColors from "../../utils/categoryColors";
import { shortenText } from "../../utils/shortenText";
import { formatTimeAgo } from "../../utils/timeAgo";
import type { Tweet } from "../../utils/useFetchTweet";
import { parseTweetMedia } from "../../utils/parseTweetMedia";
import MarkBookmark from "../ui/MarkBookmark";
import View from "../ui/View";

interface Props {
  results: Tweet[];
  loading: boolean;
}

const SearchResults: React.FC<Props> = ({ results, loading }) => {
  if (loading) return <div className="p-6">Searching...</div>;
  if (results.length === 0) return (
    <div className="text-2xl text-center text-Black">No results found.</div>
  );

  const enrichedResults = results.map((tweet) => ({
    ...tweet,
    profilePic: tweet.profile_pic || "",
    ...parseTweetMedia(tweet.media || []),
  }));

  return (
    <div className="relative w-full h-full">
      <ul className="grid grid-cols-3 gap-5">
        {enrichedResults.map((tweet) => (
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
                {tweet.category}
              </span>

              <div className="flex justify-between">
                <span className="text-[12px] text-TextGray font-medium">
                  Bookmarked:
                </span>
                <span className="flex text-TextGray text-[14px] items-center gap-1">
                  <img src={Time} alt="timeicon" />
                  {formatTimeAgo(tweet.created_at)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {tweet.profilePic && (
                  <img
                    src={tweet.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mb-2"
                  />
                )}
                {tweet.is_verified && (
                  <span className="text-blue-500">✔️</span>
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

              <div className="bg-BorderGray h-px"></div>

              <div className="flex flex-row gap-3">
                <View tweet={tweet} />
                <MarkBookmark />
              </div>
            </main>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;