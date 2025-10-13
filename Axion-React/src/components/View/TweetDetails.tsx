import type { Bookmark } from "../../utils/FetchBookmarks";

interface Props {
  tweet: Bookmark;
  onBack: () => void;
}

const TweetDetails: React.FC<Props> = ({ tweet, onBack }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <button onClick={onBack} className="text-red-500 mb-4">← Back</button>
      <div className="flex items-center gap-3 mb-4">
        <img src={tweet.profile_pic} alt="Profile" className="w-10 h-10 rounded-full" />
        <span className="text-gray-700 font-semibold">@{tweet.username}</span>
        {tweet.is_verified && <span className="text-blue-500">✔️</span>}
      </div>
      <p className="text-lg text-black mb-2">{tweet.tweet_text}</p>
      <div className="text-sm text-gray-500 mb-2">
        <strong>Category:</strong> {tweet.category}
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <strong>Created:</strong> {tweet.created_at}
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <strong>Likes:</strong> {tweet.likes} | <strong>Retweets:</strong> {tweet.retweets} | <strong>Comments:</strong> {tweet.comments}
      </div>
    </div>
  );
};

export default TweetDetails;