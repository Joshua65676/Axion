import React, { useState } from "react";
import { Button } from "../ui/Button";
import { API_BASE_URL } from "../../constants/api";

const AuthorizeButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = `${API_BASE_URL}/twitter-login.php`;
  };

  return (
    <section className="">
      <main className="">
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="bg-BgBlue hover:bg-BlueHover w-[361px] lg:w-[465px] h-[50px]"
        >
          <span className="text-[16px] font-semibold leading-[20px] tracking-[0px] text-White">
            {isLoading ? "Loading...." : "Authorize Twitter Access"}
          </span>
        </Button>
      </main>
    </section>
  );
};

export default AuthorizeButton;
