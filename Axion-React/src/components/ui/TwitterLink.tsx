import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
interface URL {
  url: string;
}

const TwitterLink: React.FC<URL> = ({ url }) => {
  return(
      <>
      <Link to={url} target="_blank" rel="noopener noreferrer">
        <Button className="bg-WhiteGra flex flex-row gap-5 h-[60px] w-[500px] border border-ParagraphGray">
          <span className="text-[12px] text-ParagraphGray font-medium leading-[15px] tracking-[0px]">Open in twitter</span>
        </Button>
      </Link>
    </>
  ) 
};

export default TwitterLink;
