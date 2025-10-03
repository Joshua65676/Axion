import React, { useState } from "react";
import { format } from "date-fns";
import { ArrowDown } from "../../assets";

const BookmarkFilter: React.FC = () => {
  const [readStatus, setReadStatus] = useState("");
  const [date, setDate] = useState(format(new Date(), "dd MMM yyyy"));
  const [time, setTime] = useState("");

  return (
    <main className="container w-full max-w-6xl mx-auto">
      <section className="flex flex-row justify-between">
        <h2 className="text-[16px] leading-[20px] tracking-[0px] text-Black font-medium">
          Bookmarks
        </h2>
        <div className="flex flex-row gap-[22px]">
          <span className="text-[14px] leading-[100%] tracking-[-0.5%] text-Black font-normal">
            Filter By:
          </span>
          {/* Filter Option */}
          <div className="flex flex-row -mt-2.5 gap-3">
            {/* Read bookmark */}
            <div className="relative">
              <select
                value={readStatus}
                title="read"
                onChange={(e) => setReadStatus(e.target.value)}
                className="appearance-none text-Black text-[14px] leading-[100%] tracking-[-0.5%] bg-white border border-gray-300 rounded-2xl px-4 py-2 pr-8 font-normal focus:outline-none"
              >
                <option value="">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
              <img src={ArrowDown} alt="arrow " className="absolute right-3 top-[10px] pointer-events-none"/>
            </div>
            {/* Date Filter */}
            <div className="relative">
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-Black text-[14px] leading-[100%] tracking-[-0.5%] bg-white border border-gray-300 rounded-2xl px-[7px] py-[7px] font-normal focus:outline-none"
              />
              <img src={ArrowDown} alt="arrow " className="absolute right-3 top-[10px] pointer-events-none"/>
            </div>
            {/* Time Filter */}
            <div className="relative">
              <input
                type="time"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-Black text-[14px] leading-[100%] tracking-[-0.5%] bg-white border border-gray-300 rounded-2xl px-[7px] py-[7px] font-normal focus:outline-none"
              />
              <img src={ArrowDown} alt="arrow " className="absolute right-3 top-[10px] pointer-events-none"/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookmarkFilter;
