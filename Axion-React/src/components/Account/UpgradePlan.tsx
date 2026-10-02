import React from "react";
import { Button } from "../ui/Button";

const UpgradePlan: React.FC = () => {
  return (
    <section className="w-[264px] md:-ml-5 rounded-[25px] p-4 bg-linear-to-b from-[rgba(29,161,242,1)] to-[rgba(17,93,140,1)]">
      <main className="container mx-auto w-full max-w-6xl flex flex-col items-start text-start gap-2">
        <div className="flex flex-row items-start gap-2">
          <div className="w-[20px] h-[20px] rounded-[50px] bg-white" />
          <div className="flex flex-col items-start gap-1">
            <span className="font-roboto font-medium text-[12px] leading-[15px] tracking-[0px] text-white">
              Pro Plan
            </span>
            <p className="font-roboto font-[400px] text-[10px] leading-[15px] tracking-[0px] text-white w-[189px]">
              Upgrade to pro, to get access to unlimited bookmarks.
            </p>
          </div>
        </div>
        <Button className="bg-white w-[230px] h-[35px] cursor-pointer rounded-[20px] p-[10px]">
          <span className="font-roboto font-[400px] text-[10px] leading-[15px] tracking-[0px] text-BgBlue">Upgrade Plan</span>
        </Button>
      </main>
    </section>
  );
};

export default UpgradePlan;
