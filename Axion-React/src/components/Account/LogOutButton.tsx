import React from "react";
import { SignOut } from "../../assets";
import { useNavigate, useLocation } from "react-router-dom";

const LogOutButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="container max-w-6xl w-full max-auto">
      <section className="-ml-5">
        <button
          onClick={() =>
            navigate("/logout", { state: { backgroundLocation: location } })
          }
          className="flex flex-row gap-3"
        >
          <img src={SignOut} alt="Logout icon" />
          <h5 className="text-TextColor text-[14px] font-semibold">Log Out</h5>
        </button>
      </section>
    </main>
  );
};

export default LogOutButton;
