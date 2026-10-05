import React from "react";
import { BackArrow } from "../../assets";

interface Props {
  onClick: () => void;
}

const BackButton: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="relative z-10 cursor-pointer"
      >
        <img src={BackArrow} alt="back arrow" />
      </button>
    </>
  );
};

export default BackButton;
