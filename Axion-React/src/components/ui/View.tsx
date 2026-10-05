import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

interface Props {
  tweet: {
    tweet_id: string | number;
    username: string;
  };
}
const View: React.FC<Props> = ({ tweet }) => {
  return (
    <>
      <Button
        asChild
        className="relative z-10 h-[40px] w-[142px] bg-ViewButton text-center hover:bg-BlueHover rounded-[20px] border-none"
      >
        <Link
          to={`/${tweet.username}/tweet/${tweet.tweet_id}`}
          state={{ tweet }}
        >
          <span className="text-[12px] font-medium leading-[15px] tracking-[0px] text-White">
            View
          </span>
        </Link>
      </Button>
    </>
  );
};

export default View;
