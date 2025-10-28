import React, { useEffect, useState } from "react";
import { Sun, Moon } from "../../assets";

const ModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(stored);
    document.body.classList.toggle("dark-mode", stored);
  }, []);

  const activateLightMode = () => {
    setIsDarkMode(false);
    localStorage.setItem("darkMode", "false");
    document.body.classList.remove("dark-mode");
  };

  const activateDarkMode = () => {
    setIsDarkMode(true);
    localStorage.setItem("darkMode", "true");
    document.body.classList.add("dark-mode");
  };

  return (
    <main className="">
      <section className="flex flex-col">
        {/* Line */}
        <div className="bg-BorderGray h-px"></div>

        {/* Main Toggle */}
        <div className="flex justify-between items-center flex-row gap-3">
          <span className="text-TextColor text-[14px] font-medium leading-[15px] tracking-0">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
          <div className="flex flex-row gap-2 p-1 px-1.5 items-center w-[120px] h-[45px] bg-BorderGray rounded-[50px]">
            <button
             onClick={activateLightMode}
             className={` ${!isDarkMode ? "bg-White" : ""}`}
            >
            <img src={Sun} alt="Light Mode"/>
            </button>

            <button
             onClick={activateDarkMode}
             className={`${isDarkMode ? "bg-White" : ""}`}
            >
            <img src={Moon} alt="Dark Mode"/>
            </button>
          </div>
        </div>

        {/* Line */}
        <div className="bg-BorderGray h-px"></div>
      </section>
    </main>
  );
};

export default ModeToggle;
