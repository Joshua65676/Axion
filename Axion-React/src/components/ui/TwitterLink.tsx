import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
interface URL {
  url: string;
}

const TwitterLink: React.FC<URL> = ({ url }) => {
  return (
    <>
      <Link
        className="min-w-0 flex-1 basis-[180px]"
        to={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="h-[60px] w-full border border-ParagraphGray bg-WhiteGra">
          <span className="text-[12px] text-ParagraphGray font-medium leading-[15px] tracking-[0px]">
            Open in twitter
          </span>
        </Button>
      </Link>
    </>
  );
};

export default TwitterLink;
