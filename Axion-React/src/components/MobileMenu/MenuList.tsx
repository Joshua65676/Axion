import React from "react";
import MenuList from "../DesktopMenu/MenuList";
import UpgradePlan from "../Account/UpgradePlan";
import ConnectExtension from "../Extension/ConnectExtension";
import Account from "../Account/Account";

interface Props {
  onClicks: () => void;
}

const MobileMenuList: React.FC<Props> = ({ onClicks }) => {
  return (
    <main onClick={onClicks} className="flex flex-col gap-9">
      <>
        <MenuList />
      </>
      <>
        <UpgradePlan />
      </>
      <>
        <ConnectExtension />
      </>
      <>
        <Account />
      </>
    </main>
  );
};

export default MobileMenuList;
