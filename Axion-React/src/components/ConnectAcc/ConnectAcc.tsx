import React, { useState } from "react";
import { ConnectIcon } from "../../assets";
import TwitterAuth from "./TwitterAuth";
import { Button } from "../ui/Button";

const ConnectAcc: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);

  const handleCancel = () => {
    setShowAuth(false);
  };


  return (
    <section className="container max-w-6xl mx-auto w-full">
      <main className="flex flex-col gap-6 relative">
        {!showAuth && (
          <div className="flex flex-col gap-20 items-center text-center justify-between">
            <div className="flex flex-col gap-3 justify-center items-center text-center">
              <div className="">
                <img src={ConnectIcon} alt="Connect icon" />
              </div>
              <h1 className="text-TextColor font-semibold text-[20px] leading-[15px] tracking-[-0.5%]">
                Connect Account
              </h1>
              <p className="text-TextColor text-[14px] w-[400px] leading-[18px] tracking-[-0.5%] font-normal">
                Please connect account so we could be able to get your bookmarks
              </p>
            </div>
            <div className="">
              <Button
                onClick={() => setShowAuth(true)}
                className="rounded-lg bg-BgBlue w-[325px] hover:bg-blue-500"
              >
                <span className="text-[14px] font-medium leading-[15px] tracking-[-0.5%] text-White">
                  Connect Account
                </span>
              </Button>
            </div>
          </div>
        )}

        {/* Authorize Page */}
        {showAuth && (
          <main className="-ml-7">
            <TwitterAuth onCancel={handleCancel} />
          </main>
        )}
      </main>
    </section>
  );
};

export default ConnectAcc;
