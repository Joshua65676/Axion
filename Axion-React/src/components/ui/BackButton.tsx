import React from "react";
import { BackArrow } from "../../assets";

const BackButton: React.FC = () => {
  return (
    <main className="">
      <img src={BackArrow} alt="back" />
    </main>
  );
};

export default BackButton;
