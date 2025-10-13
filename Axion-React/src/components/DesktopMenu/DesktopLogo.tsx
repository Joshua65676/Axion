import React from "react";
import { Logo } from "../../assets";

const DesktopLogo: React.FC = () => {
  return (
    <>
      <img src={Logo} alt="Axion Logo" className="w-15 h-10 rounded-md" />
    </>
  );
};

export default DesktopLogo;
