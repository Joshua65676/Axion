/// <reference types="chrome" />

interface ExtensionResponse {
  installed: boolean;
}

export function checkExtensionInstalled(): Promise<boolean> {
  const EXTENSION_ID = "mmjafioelfofijndijanalmngffniegp"; // Replace with actual ID

  return new Promise((resolve) => {
    if (!window.chrome?.runtime?.sendMessage) return resolve(false);

    chrome.runtime.sendMessage(
      EXTENSION_ID,
      { message: "ping" },
      (response: ExtensionResponse) => {
        if (chrome.runtime.lastError || !response?.installed) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}