import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("https://joshdev.infinityfreeapp.com/logOut.php", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error("Logout failed:", err));
  };
  return (
    <div className=" flex items-center justify-center py-[20px] px-[10px]">
      <div className="bg-BgBlue flex flex-col gap-12 py-[30px] px-[15px] rounded-[25px] shadow-lg text-center w-[317px] h-[197px]">
        <div className="flex flex-col gap-5">
          <h2 className="text-White text-[20px] leading-[15px] tracking-[0px] font-medium">Log Out</h2>
          <p className="text-[12px] font-normal text-WhiteGray leading-[15px] tracking-[0px]">
            Are you sure you want to logout?
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleLogout}
            className="px-4 py-2 bg-ParagraphGray hover:bg-UnreadText text-white rounded-[20px] w-[130px] h-[35px]"
          >
            Yes
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-White text-BgBlue rounded-[20px] w-[130px] h-[35px]"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
