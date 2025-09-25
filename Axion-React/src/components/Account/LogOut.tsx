import React from "react";
import { SignOut } from "../../assets";

const LogOut: React.FC = () => {
  return (
    <section className="container max-w-6xl w-full max-auto">
      <main className="-ml-5">
        <button className="flex flex-row gap-3">
          <img src={SignOut} alt="Logout icon" />
          <h5 className="text-TextColor text-[14px] font-semibold">Log Out</h5>
        </button>
      </main>
    </section>
  );
};

export default LogOut;
