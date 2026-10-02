import React from "react";
import { Button } from "../ui/Button";

const ConnectButton: React.FC = () => {
  return (
    <>
      <main className="">
        <Button className="w-full max-w-[20rem] rounded-lg bg-BgBlue hover:bg-blue-500">
          <span className="text-[14px] font-medium leading-[15px] tracking-[-0.5%] text-White">
            Connect Account
          </span>
        </Button>
      </main>
    </>
  );
};

export default ConnectButton;
