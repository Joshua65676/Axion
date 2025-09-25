import React from "react";
import { Button } from "../ui/Button";

const UpgradePlan: React.FC = () => {
  return (
    <section className="container mx-auto w-full max-w-6xl -ml-3 mt-6">
      <Button className="bg-BgBlue rounded-full hover:bg-blue-500 w-[15.7rem]">
        <span className="text-[18px] font-bold text-White">Upgrade Plan</span>
      </Button>
    </section>
  );
};

export default UpgradePlan;
