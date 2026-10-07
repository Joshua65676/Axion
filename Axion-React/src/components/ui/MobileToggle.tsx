import React, { useEffect, useState } from "react";
import { Sun, Moon } from "../../assets";

const MobileToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(stored);
    document.body.classList.toggle("dark-mode", stored);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("darkMode", String(nextMode));

    if (nextMode) {
      document.body.classList.add("dark-mode");
      return;
    }

    document.body.classList.remove("dark-mode");
  };

  return (
    <main>
      <section className="flex flex-col">
        <div className="flex flex-row items-center justify-between gap-3">
          <span className="flex flex-row items-center gap-2 text-[14px] font-medium leading-[15px] tracking-0 text-TextColor">
            {isDarkMode ? (
              <img src={Moon} alt="Dark Mode" />
            ) : (
              <img src={Sun} alt="Light Mode" />
            )}
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </span>

          <button
            type="button"
            aria-label={isDarkMode ? "Turn off dark mode" : "Turn on dark mode"}
            aria-pressed={isDarkMode}
            onClick={toggleDarkMode}
            className={`relative flex h-[24px] w-[43px] cursor-pointer items-center overflow-hidden rounded-[50px] shadow-inner transition-colors duration-200 ${
              isDarkMode ? "bg-Black" : "bg-Border"
            }`}
          >
            <span
              className={`absolute left-[2px] top-[1.5px] h-[20px] w-[20px] rounded-full shadow-md transition-all duration-200 ${
                isDarkMode
                  ? "translate-x-[19px] bg-BorderGray"
                  : "translate-x-0 bg-white"
              }`}
            />
          </button>
        </div>
      </section>
    </main>
  );
};

export default MobileToggle;
