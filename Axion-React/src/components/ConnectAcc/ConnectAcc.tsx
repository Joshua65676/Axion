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
      <main className="flex flex-col gap-6 relative justify-center items-center">
        {!showAuth && (
          <div className="flex flex-col gap-20 items-center text-center justify-center pl-4 lg:pl-0 md:pl-[15rem] sm:pl-[10rem]">
            <div className="flex flex-col gap-5 justify-center items-center text-center">
              <div className="">
                <img src={ConnectIcon} alt="Connect icon" />
              </div>
              <h2 className="text-TextColor font-semibold text-[25px] lg:text-[30px] leading-[15px] tracking-[-0.5%]">
                Connect Account
              </h2>
              <p className="text-TextColor text-[14px] w-[400px] leading-[18px] tracking-[-0.5%] font-normal">
                Please connect account so we could be able to get your bookmarks
              </p>
            </div>
            <div className="">
              <Button
                onClick={() => setShowAuth(true)}
                className="rounded-lg bg-BgBlue w-[325px] hover:bg-blue-500"
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
