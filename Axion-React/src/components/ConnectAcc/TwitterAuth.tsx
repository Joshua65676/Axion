import React from "react";
import { PermissionList } from "../../constants";
import { Button } from "../ui/Button";
import AuthorizeButton from "./AuthorizeButton";

type TwitterAuthProps = {
  onCancel: () => void;
};


const TwitterAuth: React.FC<TwitterAuthProps> = ({ onCancel }) => {
  return (
    <section className="lg:bg-[rgba(0,0,0,0.6)] bg-opacity- absolute top-30 lg:absolute lg:top-0 lg:left-0 lg:h-[100vh] lg:w-[100vw] lg:z-50 items-center justify-center flex flex-col">
      <main className="flex flex-col lg:gap-15 items-center justify-between lg:w-[550px] lg:h-[550px] lg:bg-White lg:py-13 lg:ml-20 lg:p-12 lg:rounded-2xl lg:shadow-md">
        {/* Header */}
        <div className="text-start flex flex-col gap-6 pl-5 lg:pl-0 w-full ">
          <h2 className="lg:text-[30px] text-[20px] font-medium tracking-[0px] leading-[35px] text-TextColor">
            Connect Your Twitter Account
          </h2>
          <p className="lg:text-[17px] text-[14px] w-[350px] lg:w- text-ParagraphGray font-medium tracking-[-0.5px] leading-[25px]">
            We need access to your bookmarks to help you manage them. Your data
            stays secure.
          </p>
          {/* Permission List */}
          <div className="flex flex-col gap-[10px] bg-BgParagraph rounded-[20px] py-[20px] px-[15px] w-[24rem] lg:w-full">
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
        <main className="flex flex-col gap-4 pl-5 lg:pl- fixed bottom-8 lg:static">
          <AuthorizeButton />
          <div className="">
            <Button onClick={onCancel} className="bg-White w-[361px] lg:w-[465px] h-[50px] border border-Black">
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
