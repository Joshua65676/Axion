import React from "react";
import { Notification as NotificationIcon } from "../../assets";

const Notification: React.FC = () => {
  return (
    <section>
      <main className="flex items-center justify-center">
        <button className="">
          <img src={NotificationIcon} alt="notification icon" />
        </button>
      </main>
    </section>
  );
};

export default Notification;
