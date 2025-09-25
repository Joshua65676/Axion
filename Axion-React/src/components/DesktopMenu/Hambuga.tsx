import React from "react";
import { Hamburger } from "../../assets";

const Hambuga: React.FC = () => {
  return (
    <section>
      <main className="flex items-center justify-center">
        <button className="">
          <img src={Hamburger} alt="humburger icon" />
        </button>
      </main>
    </section>
  );
};

export default Hambuga;
