import React, { useState, useEffect } from "react";
import { checkExtensionInstalled } from "../../utils/extension";
import ConnectButton from "./ConnectButton";
import ExtensionNotInstallButton from "./ExtensionNotInstallButton";
import ModeToggle from "../ui/ModeToggle";

const ConnectExtension: React.FC = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkExtensionInstalled().then((installed) => {
      setIsInstalled(installed);

      if (installed) { 
        checkExtensionInstalled().then((connected) => {
        setIsConnected(connected);
        });
      }
    });
  }, []);

  return (
    <main>
      {!isInstalled ? (
        <div>
          <ExtensionNotInstallButton />
        </div>
      ) : !isConnected ? (
        <div>
          <ConnectButton />
        </div>
      ) : (
        <div>
          <ModeToggle />
        </div>
      )}
    </main>
  );
};

export default ConnectExtension;
