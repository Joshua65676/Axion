import React from "react";
import Profile from "./Profile";
import LogOut from "./LogOutButton";

const Account: React.FC = () => {
  return (
    <section className="container max-w-6xl mx-auto w-full fixed bottom-4">
      <main className="flex flex-col gap-3">
        <div className="">
          <h3 className="text-TextColor text-[16px] font-semibold">Account</h3>
        </div>
        <main className="flex flex-col gap-5">
          <Profile />
          <LogOut />
        </main>
      </main>
    </section>
  );
};

export default Account;
