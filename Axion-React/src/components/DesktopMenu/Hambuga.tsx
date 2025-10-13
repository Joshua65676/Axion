import React from "react";
import { Hamburger } from "../../assets";

const Hambuga: React.FC = () => {
  return (
    <>
      <main className="flex items-center justify-center">
        <button>
          <img src={Hamburger} alt="humburger icon" />
        </button>
      </main>
    </>
  );
};

export default Hambuga;
