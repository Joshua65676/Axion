import React from "react";
import { Button } from "../ui/Button";
import ProtectedRoute from "../ProtectedRoute";
import { Arrow } from "../../assets";

const Profile: React.FC = () => {
  const screenName = sessionStorage.getItem("screen_name");

  return (
      <main className="-ml-3">
        <Button className="bg-SearchGray rounded-full hover:bg-gray-300 w-[15.7rem]">
          <ProtectedRoute>
            <main className="flex flex-row gap-20 items-center justify-center">
              {/* User Name and Profile Pics */}
              <div>
                {/* User Name */}
                <div className="flex flex-col">
                  <span className="text-TextColor text-[14px] font-semibold leading-[15px] tracking-[0]">
                    {screenName}
                  </span>
                  <span className="text-TextGray text-[10px] font-normal leading-[15px] tracking-[0] text-start">
                    Connected
                  </span>
                </div>
              </div>

              <div>
                <img src={Arrow} alt="arrow icon" />
              </div>
            </main>
          </ProtectedRoute>
        </Button>
      </main>
  );
};

export default Profile;
