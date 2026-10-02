import React from "react";
import { CheckMark } from "../../assets";
import { Button } from "./Button";

const MarkBookmark2: React.FC = () => {
  return (
    <>
      <section className="min-w-0 flex-1 basis-[180px]">
        <Button className="h-[60px] w-full bg-BgBlue hover:bg-BlueHover">
          <span className="text-[12px] text-WhiteGray font-medium leading-[15px] tracking-[0px]">
            Mark as Read
          </span>
          <img src={CheckMark} alt="MarkIcon" />
        </Button>
      </section>
    </>
  );
};

export default MarkBookmark2;
