import React from "react";
import { ConnectIcon } from "../../assets";

const ConnectAcc: React.FC = () => {
  return (
    <section className="">
      <main className="">
        <div className="">
          <div className="">
            <img src={ConnectIcon} alt="Connect icon" />
          </div>
          <h1 className="">Connect Account</h1>
          <p className="">
            Please connect account so we could be able to get your bookmarks
          </p>
        </div>
        <div className=""></div>
      </main>
    </section>
  );
};

export default ConnectAcc;
