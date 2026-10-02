import React, { useState } from "react";
import { ConnectIcon } from "../../assets";
import TwitterAuth from "./TwitterAuth";
import { Button } from "../ui/Button";
// import { useNavigate } from "react-router-dom";

const ConnectAcc: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  // const navigate = useNavigate();

  const handleCancel = () => {
    setShowAuth(false);
  };

  // useEffect(() => {
  //   fetch("http://localhost/axion/Axion-PHP/check-login.php")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.loggedIn) {
  //         // sessionStorage.setItem("loggedIn", "true");
  //         sessionStorage.setItem("screen_name", data.screen_name);
  //         navigate("/home");
  //       }
  //     })
  //     .catch(err => {
  //       console.error("Login check failed:", err);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost/axion/Axion-PHP/check-login.php")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Response:", data);
  //       if (data.loggedIn && data.username && data.user_id) {
  //         sessionStorage.setItem("loggedIn", "true");
  //         sessionStorage.setItem("user_id", data.user_id);
  //         sessionStorage.setItem("screen_name", data.username);
  //         navigate("/home");
  //       }
  //     });
  // }, []);

  return (
    <section className="container max-w-6xl mx-auto w-full">
      <main className="relative flex w-full flex-col items-center justify-center gap-6">
        {!showAuth && (
          <div className="flex w-full flex-col items-center justify-center gap-12 px-4 text-center sm:gap-16">
            <div className="flex flex-col gap-5 justify-center items-center text-center">
              <div className="">
                <img src={ConnectIcon} alt="Connect icon" />
              </div>
              <h2 className="text-TextColor font-semibold text-[25px] lg:text-[30px] leading-[15px] tracking-[-0.5%]">
                Connect Account
              </h2>
              <p className="w-full max-w-[25rem] text-[14px] font-normal leading-[18px] text-TextColor">
                Please connect account so we could be able to get your bookmarks
              </p>
            </div>
            <div className="">
              <Button
                onClick={() => setShowAuth(true)}
                className="w-full max-w-[20rem] rounded-lg bg-BgBlue hover:bg-blue-500"
              >
                <span className="text-[14px] font-medium leading-[15px] tracking-[-0.5%] text-White">
                  Connect Account
                </span>
              </Button>
            </div>
          </div>
        )}
      </main>
      {/* Authorize Page */}
      {showAuth && (
        <main className="">
          <TwitterAuth onCancel={handleCancel} />
        </main>
      )}
    </section>
  );
};

export default ConnectAcc;
