import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const getStorageKey = () =>
  `axion-reminder-date-${sessionStorage.getItem("user_id") ?? "guest"}`;

interface ReminderPreferences {
  dateOn: boolean;
  timeOn: boolean;
  date: string;
  hours: number;
  minutes: number;
}

const pad = (value: number) => String(value).padStart(2, "0");

function formatDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function getInitialPreferences(): ReminderPreferences {
  const now = new Date();
  const defaults = {
    dateOn: true,
    timeOn: true,
    date: formatDate(now),
    hours: now.getHours(),
    minutes: now.getMinutes(),
  };

  try {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<ReminderPreferences>;
      return {
        dateOn:
          typeof parsed.dateOn === "boolean" ? parsed.dateOn : defaults.dateOn,
        timeOn:
          typeof parsed.timeOn === "boolean" ? parsed.timeOn : defaults.timeOn,
        date: typeof parsed.date === "string" ? parsed.date : defaults.date,
        hours:
          Number.isInteger(parsed.hours) &&
          parsed.hours! >= 0 &&
          parsed.hours! < 24
            ? parsed.hours!
            : defaults.hours,
        minutes:
          Number.isInteger(parsed.minutes) &&
          parsed.minutes! >= 0 &&
          parsed.minutes! < 60
            ? parsed.minutes!
            : defaults.minutes,
      };
    }
  } catch {
    return defaults;
  }

  return defaults;
}

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
    <div className="flex min-h-[56px] items-center justify-between gap-3 rounded-[10px] border border-Border bg-WhiteBg px-3 py-2">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-[400px] text-black leading-[125%] tracking-[-0.5%]">
            {title}
          </p>
          <p className="break-words text-[10px] font-[400px] leading-[125%] tracking-[-0.5%] text-TextColor">
            {value}
          </p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

export default function ReminderPicker() {
  const [preferences, setPreferences] = useState(getInitialPreferences);
  const selected = useMemo(() => {
    const [year, month, day] = preferences.date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }, [preferences.date]);
  const [viewDate, setViewDate] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(preferences));
  }, [preferences]);

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

  const updateTime = (unit: "hours" | "minutes", amount: number) => {
    setPreferences((current) => ({
      ...current,
      [unit]:
        (current[unit] + amount + (unit === "hours" ? 24 : 60)) %
        (unit === "hours" ? 24 : 60),
    }));
  };

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
        checked={preferences.dateOn}
        onChange={(dateOn) =>
          setPreferences((current) => ({ ...current, dateOn }))
        }
      />

      {/* Calendar */}
      {preferences.dateOn && (
        <div className="flex w-full max-w-md flex-col gap-3 px-1 sm:px-2">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-TextGray leading-[20px] tracking-[-2%]">
              {monthLabel}
            </p>
            <div className="flex gap-4 text-TextGray">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              >
                <FiChevronUp className="rotate-[-90deg]" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              >
                <FiChevronDown className="rotate-[-90deg]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center sm:gap-y-2">
            {DAYS.map((d) => (
              <span
                key={d}
                className="py-2 text-[10px] font-normal leading-4 text-TextColor"
              >
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
                  aria-label={`${viewDate.toLocaleDateString("en-US", { month: "long" })} ${day}, ${viewDate.getFullYear()}`}
                  aria-pressed={isSelected(day)}
                  onClick={() =>
                    setPreferences((current) => ({
                      ...current,
                      date: formatDate(
                        new Date(
                          viewDate.getFullYear(),
                          viewDate.getMonth(),
                          day,
                        ),
                      ),
                    }))
                  }
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[12px] transition-colors ${
                    isSelected(day)
                      ? "bg-BgBlue font-[400px] text-white"
                      : "text-TextColor hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {/* Time row */}
      <Row
        icon="🕐"
        title="Time"
        value={`${pad(preferences.hours)}:${pad(preferences.minutes)}`}
        checked={preferences.timeOn}
        onChange={(timeOn) =>
          setPreferences((current) => ({ ...current, timeOn }))
        }
      />

      {/* Time selects */}
      {preferences.timeOn && (
        <div className="flex w-fit items-center gap-2 rounded-xl border border-Border bg-WhiteBg p-2 sm:gap-3">
          {(["hours", "minutes"] as const).map((unit, index) => (
            <div key={unit} className="flex w-16 flex-col items-center">
              <button
                type="button"
                onClick={() => updateTime(unit, 1)}
                aria-label={`Increase ${unit === "hours" ? "hour" : "minute"}`}
                className="flex h-9 w-10 items-center justify-center rounded-lg text-TextGray hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-BgBlue"
              >
                <FiChevronUp aria-hidden="true" />
              </button>
              <output
                className="py-1 text-xl font-semibold tabular-nums text-TextColor"
                aria-live="polite"
              >
                {pad(index === 0 ? preferences.hours : preferences.minutes)}
              </output>
              <span className="text-[10px] uppercase text-TextColor">
                {index === 0 ? "Hour" : "Minute"}
              </span>
              <button
                type="button"
                onClick={() => updateTime(unit, -1)}
                aria-label={`Decrease ${unit === "hours" ? "hour" : "minute"}`}
                className="flex h-9 w-10 items-center justify-center rounded-lg text-TextGray hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-BgBlue"
              >
                <FiChevronDown aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
