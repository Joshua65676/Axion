import React from "react";
import { Button } from "../ui/Button";

const ExtensionNotInstall: React.FC = () => {
  return (
    <section
      id="extension-setup"
      className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 py-10"
    >
      <div className="text-center">
        <h2 className="text-[20px] font-semibold leading-tight text-TextColor">
          Set up Axion in Chrome
        </h2>
        <p className="mt-2 text-sm text-ParagraphGray">
          Download the extension, then follow the steps below to add it to
          Chrome.
        </p>
      </div>
      <Button
        asChild
        className="w-[15rem] bg-BlueHover hover:bg-BookmarkText border-none cursor-pointer rounded-[10px] py-[10px] px-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.5%] text-WhiteGray"
      >
        <a href="/axion-extension.zip" download="axion-extension.zip">
          <span className="text-WhiteGray leading-[20px]">
            Download Axion Extension
          </span>
        </a>
      </Button>

      <ol className="w-full space-y-5 text-left">
        <li className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-BgParagraph text-sm font-semibold text-BgBlue">
            1
          </span>
          <div>
            <h3 className="font-semibold text-Black">
              Extract the downloaded ZIP
            </h3>
            <p className="mt-1 text-sm leading-6 text-ParagraphGray">
              Right-click{" "}
              <span className="font-medium">axion-extension.zip</span> and
              choose <span className="font-medium">Extract All</span>. Keep the
              extracted folder somewhere you can find it.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-BgParagraph text-sm font-semibold text-BgBlue">
            2
          </span>
          <div>
            <h3 className="font-semibold text-Black">
              Open Chrome’s extensions page
            </h3>
            <p className="mt-1 text-sm leading-6 text-ParagraphGray">
              In Chrome, enter{" "}
              <span className="rounded bg-WhiteBg px-1.5 py-0.5 font-mono text-xs text-Black">
                chrome://extensions
              </span>{" "}
              in the address bar and press Enter.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-BgParagraph text-sm font-semibold text-BgBlue">
            3
          </span>
          <div>
            <h3 className="font-semibold text-Black">Turn on Developer mode</h3>
            <p className="mt-1 text-sm leading-6 text-ParagraphGray">
              Switch on <span className="font-medium">Developer mode</span> near
              the top-right of the extensions page.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-BgParagraph text-sm font-semibold text-BgBlue">
            4
          </span>
          <div>
            <h3 className="font-semibold text-Black">Load the extension</h3>
            <p className="mt-1 text-sm leading-6 text-ParagraphGray">
              Click <span className="font-medium">Load unpacked</span> and
              select the extracted Axion folder that contains{" "}
              <span className="rounded bg-WhiteBg px-1.5 py-0.5 font-mono text-xs text-Black">
                manifest.json
              </span>
              .
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-BgParagraph text-sm font-semibold text-BgBlue">
            5
          </span>
          <div>
            <h3 className="font-semibold text-Black">
              Pin Axion to your toolbar
            </h3>
            <p className="mt-1 text-sm leading-6 text-ParagraphGray">
              In Chrome’s toolbar, click the puzzle-shaped{" "}
              <span className="font-medium">Extensions</span> icon, then click
              the pin next to Axion.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-BgParagraph text-sm font-semibold text-BgBlue">
            6
          </span>
          <div>
            <h3 className="font-semibold text-Black">Return to Axion</h3>
            <p className="mt-1 text-sm leading-6 text-ParagraphGray">
              Come back to this page and refresh it to connect the extension.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
};

export default ExtensionNotInstall;
