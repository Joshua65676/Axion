import React from "react";
import { CheckMark } from "../../assets";
import { Button } from "./Button";
import { useBookmarkReadState } from "../../utils/useBookmarkReadState";

interface Props {
  tweetId: string | number;
}

const MarkBookmark2: React.FC<Props> = ({ tweetId }) => {
  const { isRead, toggleRead } = useBookmarkReadState(tweetId);

  return (
    <section className="min-w-0 flex-1 basis-[180px]">
      <Button
        type="button"
        aria-pressed={isRead}
        onClick={toggleRead}
        className="relative z-10 h-[60px] w-full bg-BgBlue hover:bg-BlueHover rounded-[20px] cursor-pointer flex flex-row items-center justify-center gap-3"
      >
        <span className="text-[12px] font-medium leading-[15px] tracking-[0px] text-WhiteGray">
          {isRead ? "Mark as Unread" : "Mark as Read"}
        </span>
        <img src={CheckMark} alt="" aria-hidden="true" />
      </Button>
    </section>
  );
};

export default MarkBookmark2;
