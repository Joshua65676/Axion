import React from "react";
import { SignOut } from "../../assets";
// import ProtectedRoute from "../ProtectedRoute";

const LogOut: React.FC = () => {
  return (
    <main className="container max-w-6xl w-full max-auto">
      <section className="-ml-5">
        {/* <ProtectedRoute> */}
          <button className="flex flex-row gap-3">
            <img src={SignOut} alt="Logout icon" />
            <h5 className="text-TextColor text-[14px] font-semibold">
              Log Out
            </h5>
          </button>
        {/* </ProtectedRoute> */}
      </section>
    </main>
  );
};

export default LogOut;
