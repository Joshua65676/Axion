import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";

const ConnectButton: React.FC = () => {
  const [status, setStatus] = useState("idle");
  const EXTENSION_ID = "mmjafioelfofijndijanalmngffniegp";

  useEffect(() => {
  if (status !== "idle") {
    const timer = setTimeout(() => {
      setStatus("idle");
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [status]);

const handleConnect = () => {
  const screen_name = sessionStorage.getItem("screen_name");
  const user_id = sessionStorage.getItem("user_id");

  if (!screen_name || !user_id) {
    console.warn(" User not logged in");
    setStatus("not-logged-in");
    return;
  }

  chrome.runtime.sendMessage(EXTENSION_ID, { ping: true }, (response) => {
    if (chrome.runtime.lastError || !response) {
      console.error(" Extension not installed or not responding");
      setStatus("not-installed");
      return;
    }

    // Send user info
    chrome.runtime.sendMessage(
      EXTENSION_ID,
      {
        type: "SET_USER",
        user: {
          screen_name,
          user_id,
        },
      },
      (res) => {
        if (chrome.runtime.lastError || !res) {
          console.error(" Failed to send user info:", chrome.runtime.lastError?.message);
          setStatus("send-failed");
        } else {
          console.log(" User info sent to extension:", res);
          setStatus("connected");
        }
      }
    );
  });
};

  return (
    <main className="flex flex-col gap-5">
      <Button onClick={handleConnect} className="w-[12rem] bg-BgBlue hover:bg-BlueHover">
        <span className="text-WhiteGray text-[16px] font-semibold leading-[100%] tracking-[-0.5%]">Connect to Axion</span>
      </Button>
      <div>
        {status === "connected" && (
          <p className="text-green-600 font-medium">
             Extension connected successfully
          </p>
        )}
        {status === "not-logged-in" && (
          <p className="text-yellow-600 font-medium"> Please log in first</p>
        )}
        {status === "send-failed" && (
          <p className="text-red-500 font-medium">
             Failed to send user info
          </p>
        )}
      </div>
    </main>
  );
};

export default ConnectButton;
