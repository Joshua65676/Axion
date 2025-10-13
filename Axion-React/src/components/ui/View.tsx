import React from "react";
import { Button } from "./Button";

interface ViewButtonProps {
    onView: () => void;
}

const View: React.FC<ViewButtonProps> = ({ onView }) => {
  return (
    <>
      <section className="">
        <Button onClick={onView} className="bg-ViewButton w-[142px] h-[40px] text-center hover:bg-BlueHover">
          <span className="text-[12px] font-medium leading-[15px] tracking-[0px] text-White">View</span>
        </Button>
      </section>
    </>
  );
};

export default View;
