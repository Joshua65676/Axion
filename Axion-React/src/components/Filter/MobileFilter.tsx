import React, { useState } from "react";
import { Filter } from "../../assets";

const MobileFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [readStatus, setReadStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Toggle bookmark filters"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-SearchGray bg-WhiteGray shadow-sm transition hover:bg-BgParagraph active:scale-[0.98]"
      >
        <img src={Filter} alt="filter icon" className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[220px] rounded-2xl border border-BorderGray bg-white p-3 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-TextGray">
              Filters
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[12px] font-medium text-BgBlue"
            >
              Close
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-[12px] font-medium text-TextGray">
              Status
              <select
                value={readStatus}
                onChange={(e) => setReadStatus(e.target.value)}
                className="mt-1 w-full rounded-xl border border-BorderGray bg-WhiteGray px-3 py-2 text-[14px] text-Black outline-none focus:border-BgBlue"
              >
                <option value="">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </label>

            <label className="block text-[12px] font-medium text-TextGray">
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-BorderGray bg-WhiteGray px-3 py-2 text-[14px] text-Black outline-none focus:border-BgBlue"
              />
            </label>

            <label className="block text-[12px] font-medium text-TextGray">
              Time
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full rounded-xl border border-BorderGray bg-WhiteGray px-3 py-2 text-[14px] text-Black outline-none focus:border-BgBlue"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilter;
