import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { API_BASE_URL } from "../../constants/api";

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/logOut.php`, {
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
      <div className="flex min-h-[197px] w-full max-w-[20rem] flex-col justify-between gap-8 rounded-[25px] bg-BgBlue px-4 py-7 text-center shadow-lg">
        <div className="flex flex-col gap-5">
          <h2 className="text-White text-[20px] leading-[15px] tracking-[0px] font-medium">
            Log Out
          </h2>
          <p className="text-[12px] font-normal text-WhiteGray leading-[15px] tracking-[0px]">
            Are you sure you want to logout?
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Button
            onClick={handleLogout}
            className="h-10 min-w-0 flex-1 bg-ParagraphGray px-3 py-2 text-white hover:bg-UnreadText"
          >
            Yes
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="h-10 min-w-0 flex-1 bg-White px-3 py-2 text-BgBlue"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
