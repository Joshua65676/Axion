import { Time } from "../../assets";
import categoryColors from "../../utils/categoryColors";
import { shortenText } from "../../utils/shortenText";
import { formatTimeAgo } from "../../utils/timeAgo";
import type { Tweet } from "../../utils/useFetchTweet";
import { normalizeTweet } from "../../utils/normalizeTweet";
import MarkBookmark from "../ui/MarkBookmark";
import View from "../ui/View";

interface Props {
  results: Tweet[];
  loading: boolean;
}

const SearchResults: React.FC<Props> = ({ results, loading }) => {
  if (loading)
    return (
      <div
        className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-3 text-center text-TextColor"
        role="status"
        aria-live="polite"
      >
        <span
          className="size-8 animate-spin rounded-full border-2 border-BorderGray border-t-BgBlue"
          aria-hidden="true"
        />
        <span className="text-sm">Searching...</span>
      </div>
    );
  if (results.length === 0)
    return (
      <div className="text-2xl text-center text-Black">No results found.</div>
    );

  const enrichedResults = results.map(normalizeTweet);

  return (
    <div className="relative h-full w-full">
      <ul className="mx-auto grid w-full max-w-[600px] min-w-0 grid-cols-1 gap-3">
        {enrichedResults.map((tweet) => (
          <li
            key={tweet.tweet_id}
            className="flex min-w-0 flex-col justify-between rounded-2xl border border-BorderGray bg-WhiteGray p-4"
          >
            <main className="flex flex-col gap-3">
              <span
                className={`h-[28px] w-[7rem] rounded-[20px] p-[5px] text-center text-[12px] font-medium ${
                  categoryColors[tweet.category?.toLowerCase()] ||
                  categoryColors.default
                }`}
              >
                {tweet.category}
              </span>

              <div className="flex justify-between">
                <span className="text-[12px] font-medium text-TextGray">
                  Bookmarked:
                </span>
                <span className="flex items-center gap-1 text-[14px] text-TextGray">
                  <img src={Time} alt="timeicon" />
                  {formatTimeAgo(tweet.created_at)}
                </span>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                {tweet.profilePic && (
                  <img
                    src={tweet.profilePic}
                    alt="Profile"
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-TextColor">
                    {tweet.display_name || tweet.username}
                  </p>
                  <p className="truncate text-[13px] text-TextGray">
                    @{tweet.username}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[16px] font-medium leading-[25px] tracking-[-0.5px] text-TextGray">
                  {shortenText(tweet.tweet_text, 100)}
                </span>
              </div>

              <div className="h-px bg-BorderGray"></div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <View tweet={tweet} />
                <MarkBookmark tweetId={tweet.tweet_id} />
              </div>
            </main>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
