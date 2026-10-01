import React from "react";
import ReminderPicker from "./Reminder/ReminderPicker";
import { Arrow, ArrowDown, Repeat } from "../assets";

const Settings: React.FC = () => {
  return (
    <section className="container max-w-6xl mx-auto w-full">
      <main className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0px] text-black">
            Reminders
          </h2>
          <p className="font-roboto font-[400px] text-[10px] leading-[10px] tracking-[0px] text-black">
            Set how we should remind of our tweet
          </p>
        </div>

        {/* Date and Time Picker */}
        <>
         <ReminderPicker />
        </>

        <div className="flex items-center h-[56px] justify-between rounded-[10px] border border-Border bg-WhiteBg px-3 py-2">
          <div className="flex flex-row items-center gap-2">
            <img src={Repeat} alt="" />
            <span className="font-[400px] text-[14px] text-TextColor leading-[125%] tracking-[-0.5%]">Repeat</span>
          </div>
          <button className="flex flex-row items-center gap-3 cursor-pointer">
            <span className="font-[400px] text-[10px] leading-[125%] tracking-[-0.5%] text-TextColor">Never</span>
            <img src={Arrow} alt="" />
          </button>
        </div>

        <div className="flex items-center h-[56px] justify-between rounded-[10px] border border-Border bg-WhiteBg px-3 py-2">
          <div className="flex flex-row items-center gap-2">
            <span className="font-[400px] text-[14px] text-TextColor leading-[125%] tracking-[-0.5%]">Maximum tweets per day</span>
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <img src={ArrowDown} alt="" />
          </div>
        </div>

      </main>
    </section>
  );
};

export default Settings;
