import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const Profile: React.FC = () => {
  const [screenName, setScreenName] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  fetch("http://localhost/axion/Axion-PHP/check-login.php")
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        setScreenName(data.screen_name);
      } else {
        navigate("/");
      }
    });
}, []);


  return (
    <section>
      <main className="-ml-3">
        <Button className="bg-SearchGray rounded-full hover:bg-gray-300 w-[15.7rem]">
          <ProtectedRoute>
            {/* User Name and Profile Pics */}
            <div>
              {/* User Name */}
              <div className="flex flex-col">
                <span className="text-TextColor text-[14px] font-semibold leading-[15px] tracking-[0]">
                  @{screenName}
                </span>
                <span className="text-TextGray text-[10px] font-normal leading-[15px] tracking-[0]">
                  Connected
                </span>
              </div>
            </div>

            <div></div>
          </ProtectedRoute>
        </Button>
      </main>
    </section>
  );
};

export default Profile;
