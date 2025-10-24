import React from "react";
import { Button } from "./Button";

const TwitterLink: React.FC = () => {
  return(
      <>
      <section className="">
        <Button className="bg-WhiteGra flex flex-row gap-5 h-[60px] w-[500px] border border-ParagraphGray">
          <span className="text-[12px] text-ParagraphGray font-medium leading-[15px] tracking-[0px]">Open in twitter</span>
        </Button>
      </section>
    </>
  ) 
};

export default TwitterLink;
