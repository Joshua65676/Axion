/// <reference types="chrome" />

interface ExtensionResponse {
  installed: boolean;
  connected?: boolean;
}

export function checkExtensionInstalled(): Promise<boolean> {
  const EXTENSION_ID = "mmjafioelfofijndijanalmngffniegp"; // Replace with actual ID

  return new Promise((resolve) => {
    if (!window.chrome?.runtime?.sendMessage) return resolve(false);

    chrome.runtime.sendMessage(
      EXTENSION_ID,
      { type: "CHECK_CONNECTION" },
      (response: ExtensionResponse) => {
        if (chrome.runtime.lastError || !response?.installed || !response.connected) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}