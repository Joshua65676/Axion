import React, { useState, useEffect } from "react";
import { checkExtensionInstalled } from "../../utils/extension";
import ConnectButton from "./ConnectButton";
import ExtensionNotInstallButton from "./ExtensionNotInstallButton";

const ConnectExtension: React.FC = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    checkExtensionInstalled().then((installed) => {
      setIsInstalled(installed);
    });
  }, []);

  return (
    <main>
      {!isInstalled ? (
        <div>
          <ExtensionNotInstallButton />
        </div>
      ) : (
        <div>
          <ConnectButton />
        </div>
      )}
    </main>
  );
};

export default ConnectExtension;
