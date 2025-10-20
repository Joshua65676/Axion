import React from "react";
import { BackArrow } from "../../assets";

interface Props {
  onClick: () => void;
}

const BackButton: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className="">
        <img src={BackArrow} alt="back arrow" />
      </button>
    </>
  );
};

export default BackButton;
