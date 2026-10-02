import React, { useEffect, useState } from "react";
import ReminderPicker from "./Reminder/ReminderPicker";
import { ArrowDown, Repeat } from "../assets";

type RepeatFrequency = "Never" | "Daily" | "Weekdays" | "Weekly";

interface GeneralSettings {
  repeat: RepeatFrequency;
  maximumTweets: number;
}

const getStorageKey = () =>
  `axion-general-settings-${sessionStorage.getItem("user_id") ?? "guest"}`;
const DEFAULT_SETTINGS: GeneralSettings = { repeat: "Never", maximumTweets: 3 };

function loadSettings(): GeneralSettings {
  try {
    const saved = localStorage.getItem(getStorageKey());
    if (!saved) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(saved) as Partial<GeneralSettings>;
    return {
      repeat: ["Never", "Daily", "Weekdays", "Weekly"].includes(
        String(parsed.repeat),
      )
        ? (parsed.repeat as RepeatFrequency)
        : DEFAULT_SETTINGS.repeat,
      maximumTweets: [1, 2, 3, 5, 10].includes(Number(parsed.maximumTweets))
        ? Number(parsed.maximumTweets)
        : DEFAULT_SETTINGS.maximumTweets,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(settings));
  }, [settings]);

  return (
    <section className="container max-w-6xl mx-auto w-full">
      <main className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0px] text-black">
            Reminders
          </h2>
          <p className="font-roboto text-[12px] leading-4 text-black">
            Set how we should remind of our tweet
          </p>
        </div>

        {/* Date and Time Picker */}
        <ReminderPicker />

        <div className="flex min-h-[56px] items-center justify-between gap-3 rounded-[10px] border border-Border bg-WhiteBg px-3 py-2">
          <div className="flex min-w-0 flex-row items-center gap-2">
            <img src={Repeat} alt="" />
            <label
              htmlFor="repeat-frequency"
              className="text-[14px] text-TextColor"
            >
              Repeat
            </label>
          </div>
          <div className="relative shrink-0">
            <select
              id="repeat-frequency"
              value={settings.repeat}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  repeat: event.target.value as RepeatFrequency,
                }))
              }
              className="min-h-10 appearance-none rounded-lg border border-Border bg-white py-2 pl-3 pr-9 text-sm text-TextColor focus-visible:outline-2 focus-visible:outline-BgBlue"
            >
              <option>Never</option>
              <option>Daily</option>
              <option>Weekdays</option>
              <option>Weekly</option>
            </select>
            <img
              src={ArrowDown}
              alt=""
              className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="flex min-h-[56px] items-center justify-between gap-3 rounded-[10px] border border-Border bg-WhiteBg px-3 py-2">
          <div className="flex min-w-0 flex-row items-center gap-2">
            <label
              htmlFor="maximum-tweets"
              className="text-[14px] text-TextColor"
            >
              Maximum tweets per day
            </label>
          </div>
          <div className="relative shrink-0">
            <select
              id="maximum-tweets"
              value={settings.maximumTweets}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  maximumTweets: Number(event.target.value),
                }))
              }
              className="min-h-10 appearance-none rounded-lg border border-Border bg-white py-2 pl-3 pr-9 text-sm text-TextColor focus-visible:outline-2 focus-visible:outline-BgBlue"
            >
              {[1, 2, 3, 5, 10].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            <img
              src={ArrowDown}
              alt=""
              className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Settings;
