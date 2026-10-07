import React, { useState } from "react";
import { ArrowDown } from "../../assets";

const BookmarkFilter: React.FC = () => {
  const [readStatus, setReadStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <main className="mx-auto w-full max-w-6xl">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[16px] font-medium leading-[20px] tracking-[0px] text-Black">
          Bookmarks
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-[22px]">
          <span className="text-[14px] font-normal leading-[100%] tracking-[-0.5%] text-Black">
            Filter By:
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={readStatus}
                title="read"
                onChange={(e) => setReadStatus(e.target.value)}
                className="appearance-none rounded-2xl border border-BorderGray bg-white px-4 py-2 pr-8 text-[14px] font-normal leading-[100%] tracking-[-0.5%] text-Black outline-none focus:border-BgBlue"
              >
                <option value="">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
              <img
                src={ArrowDown}
                alt="arrow"
                className="pointer-events-none absolute right-3 top-[10px]"
              />
            </div>

            <div className="relative">
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-2xl border border-BorderGray bg-white px-[7px] py-[7px] text-[14px] font-normal leading-[100%] tracking-[-0.5%] text-Black outline-none focus:border-BgBlue"
              />
            </div>

            <div className="relative">
              <input
                type="time"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-2xl border border-BorderGray bg-white px-[7px] py-[7px] text-[14px] font-normal leading-[100%] tracking-[-0.5%] text-Black outline-none focus:border-BgBlue"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookmarkFilter;
