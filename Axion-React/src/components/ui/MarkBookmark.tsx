import React from "react";
import { Button } from "./Button";
import { CheckMark } from "../../assets";
import { useBookmarkReadState } from "../../utils/useBookmarkReadState";

interface Props {
  tweetId: string | number;
}

const MarkBookmark: React.FC<Props> = ({ tweetId }) => {
  const { isRead, toggleRead } = useBookmarkReadState(tweetId);

  return (
    <Button
      type="button"
      aria-pressed={isRead}
      onClick={toggleRead}
      className="relative z-10 flex h-[40px] w-[158px] flex-row gap-3 border border-ParagraphGray bg-WhiteGray rounded-[20px] cursor-pointer"
    >
      <img src={CheckMark} alt="" aria-hidden="true" />
      <span className="text-[12px] font-medium leading-[15px] tracking-[0px] text-ParagraphGray">
        {isRead ? "Mark as Unread" : "Mark as Read"}
      </span>
    </Button>
  );
};

export default MarkBookmark;
