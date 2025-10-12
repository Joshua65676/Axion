import React, { useState, useEffect } from "react";
import { checkExtensionInstalled } from "../../utils/extension";
import ExtensionNotInstall from "./ExtensionNotInstall";
import ConnectButton from "./ConnectButton";

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
          <ExtensionNotInstall />
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
