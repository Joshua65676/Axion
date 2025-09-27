import React from "react";
import { PermissionList } from "../../constants";
import { Button } from "../ui/Button";
import AuthorizeButton from "./AuthorizeButton";

type TwitterAuthProps = {
  onCancel: () => void;
};


const TwitterAuth: React.FC<TwitterAuthProps> = ({ onCancel }) => {
  return (
    <section className="bg-[rgba(0,0,0,0.6)] bg-opacity- absolute top-0 left-0 h-[100vh] w-[100vw] z-50 items-center justify-center flex flex-col">
      <main className="flex flex-col gap-15 items-center justify-between w-[550px] h-[520px] bg-White py-13 pl-10 p-12 rounded-2xl shadow-md">
        {/* Header */}
        <div className="text-start flex flex-col gap-6">
          <h2 className="text-[30px] font-medium tracking-[0px] leading-[35px] text-TextColor">
            Connect Your Twitter Account
          </h2>
          <p className="text-[17px] text-ParagraphGray font-medium tracking-[-0.5px] leading-[25px]">
            We need access to your bookmarks to help you manage them. Your data
            stays secure.
          </p>
          {/* Permission List */}
          <div className="flex flex-col gap-[10px] bg-BgParagraph rounded-[20px] py-[20px] px-[15px] ">
            <span className="text-ParagraphGray font-medium text-[16px] leading-[15px] tracking-[0px]">
              Permission needed:
            </span>
            {PermissionList.map(({ id, itemsName }) => (
              <ul key={id} className="pl-7">
                <li className="text-ParagraphGray list-disc text-[16px] font-medium tracking-[0px] leading-[20px]">
                  {itemsName}
                </li>
              </ul>
            ))}
          </div>
        </div>

        {/* Authorize Button and Cancel button*/}
        <main className="flex flex-col gap-4">
          <AuthorizeButton />
          <div className="">
            <Button onClick={onCancel} className="bg-White w-[465px] h-[50px] border-2 border-Black">
              <span className="text-[16px] leading-[20px] tracking-[0px] font-semibold text-BgBlue">
                Cancel
              </span>
            </Button>
          </div>
        </main>
      </main>
    </section>
  );
};

export default TwitterAuth;
