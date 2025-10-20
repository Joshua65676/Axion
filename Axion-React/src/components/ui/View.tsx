import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import type { Bookmark } from "../../utils/FetchBookmarks";

interface Props {
  tweet: Bookmark;
}
const View: React.FC<Props> = ({ tweet }) => {
  return (
    <>
      <Link to={`/${tweet.username}/tweet/${tweet.tweet_id}`} state={{ tweet }}>
        <Button className="bg-ViewButton w-[142px] h-[40px] text-center hover:bg-BlueHover">
          <span className="text-[12px] font-medium leading-[15px] tracking-[0px] text-White">
            View
          </span>
        </Button>
      </Link>
    </>
  );
};

export default View;
