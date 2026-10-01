import { useMemo, useState } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[24px] w-[43px] shrink-0 rounded-full transition-colors ${
        checked ? "bg-BgBlue" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-[1.6px] h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-5.5" : "left-1"
        }`}
      />
    </button>
  );
}

function Row({
  icon,
  title,
  value,
  checked,
  onChange,
}: {
  icon: string;
  title: string;
  value: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center h-[56px] justify-between rounded-[10px] border border-Border bg-WhiteBg px-3 py-2">
      <div className="flex items-center gap-4">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-[400px] text-black leading-[125%] tracking-[-0.5%]">{title}</p>
          <p className="text-[10px] font-[400px] leading-[125%] tracking-[-0.5%] text-TextColor">{value}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

export default function ReminderPicker() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState<Date>(today);
  const [dateOn, setDateOn] = useState(true);
  const [timeOn, setTimeOn] = useState(true);
  const [minutes, setMinutes] = useState(13);
  const [hours, setHours] = useState(13);

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Leading blanks + days of the month
  const cells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const offset = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    return [
      ...Array<null>(offset).fill(null),
      ...Array.from({ length: count }, (_, i) => i + 1),
    ];
  }, [viewDate]);

  const shiftMonth = (n: number) =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + n, 1));

  const isSelected = (day: number) =>
    selected.getFullYear() === viewDate.getFullYear() &&
    selected.getMonth() === viewDate.getMonth() &&
    selected.getDate() === day;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="w-full space-y-6">
      {/* Date row */}
      <Row
        icon="📅"
        title="Date"
        value={selected.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        checked={dateOn}
        onChange={setDateOn}
      />

      {/* Calendar */}
      {dateOn && (
        <div className="px-2 max-w-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-TextGray leading-[20px] tracking-[-2%]">{monthLabel}</p>
            <div className="flex gap-4 text-TextGray">
              <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month">
                ‹
              </button>
              <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-3 text-center">
            {DAYS.map((d) => (
              <span key={d} className="text-[10px] font-[400px] text-TextColor leading-[20%] tracking-[-2%]">
                {d}
              </span>
            ))}
            {cells.map((day, i) =>
              day === null ? (
                <span key={`blank-${i}`} />
              ) : (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    setSelected(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))
                  }
                  className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[12px] leading-[10px] tracking-[-2%] transition-colors ${
                    isSelected(day)
                      ? "bg-BgBlue font-[400px] text-white"
                      : "text-TextColor hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Time row */}
      <Row
        icon="🕐"
        title="Time"
        value={`${pad(hours)}:${pad(minutes)}`}
        checked={timeOn}
        onChange={setTimeOn}
      />

      {/* Time selects */}
      {timeOn && (
        <div className="flex gap-4 px-2">
          <select
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="rounded-lg bg-transparent py-2 text-[14px] text-TextGray font-medium leading-[20px] tracking-[-2%] outline-none"
          >
            {Array.from({ length: 24 }, (_, h) => (
              <option key={h} value={h}>
                {pad(h)} Hr
              </option>
            ))}
          </select>
          <select
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="rounded-lg bg-transparent py-2 text-[14px] text-TextGray font-medium leading-[20px] tracking-[-2%] outline-none"
          >
            {Array.from({ length: 60 }, (_, m) => (
              <option key={m} value={m}>
                {pad(m)} Min
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
