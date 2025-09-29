import React from "react";
import { Button } from "../ui/Button";

const AuthorizeButton: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost/axion/Axion-PHP/twitter-login.php";
  };

  return (
    <section className="">
      <main className="">
        <Button onClick={handleLogin} className="bg-BgBlue hover:bg-BlueHover w-[465px] h-[50px]">
          <span className="text-[16px] font-semibold leading-[20px] tracking-[0px] text-White">
            Authorize Twitter Access
          </span>
        </Button>
      </main>
    </section>
  );
};

export default AuthorizeButton;
