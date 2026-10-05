import React from "react";
import { Button } from "./Button";

interface URL {
  url: string;
}

const TwitterLink: React.FC<URL> = ({ url }) => {
  return (
    <div className="relative z-10 flex w-full">
      <Button
        asChild
        className="h-[60px] w-full border border-ParagraphGray bg-WhiteGra rounded-[20px] cursor-pointer"
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 basis-[180px] items-center justify-center"
        >
          <span className="text-[12px] text-ParagraphGray font-medium leading-[15px] tracking-[0px]">
            Open in twitter
          </span>
        </a>
      </Button>
    </div>
  );
};

export default TwitterLink;
