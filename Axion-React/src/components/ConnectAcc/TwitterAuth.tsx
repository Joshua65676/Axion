import React from "react";
import { PermissionList } from "../../constants";
import { Button } from "../ui/Button";
import AuthorizeButton from "./AuthorizeButton";

type TwitterAuthProps = {
  onCancel: () => void;
};

const TwitterAuth: React.FC<TwitterAuthProps> = ({ onCancel }) => {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6">
      <main className="flex max-h-full w-full max-w-[34rem] flex-col items-center justify-between gap-8 overflow-y-auto rounded-2xl bg-White p-5 shadow-md sm:p-8 lg:gap-10">
        {/* Header */}
        <div className="flex w-full flex-col gap-6 text-start">
          <h2 className="lg:text-[30px] text-[20px] font-medium tracking-[0px] leading-[35px] text-TextColor">
            Connect Your Twitter Account
          </h2>
          <p className="w-full text-[14px] font-medium leading-[25px] text-ParagraphGray lg:text-[17px]">
            We need access to your bookmarks to help you manage them. Your data
            stays secure.
          </p>
          {/* Permission List */}
          <div className="flex w-full flex-col gap-[10px] rounded-[20px] bg-BgParagraph px-4 py-5 sm:px-5">
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
        <div className="flex w-full flex-col gap-4">
          <AuthorizeButton />
          <Button
            onClick={onCancel}
            className="h-[50px] w-full border border-Black bg-White rounded-[20px] cursor-pointer"
          >
            <span className="text-[16px] font-semibold leading-[20px] text-BgBlue">
              Cancel
            </span>
          </Button>
        </div>
      </main>
    </section>
  );
};

export default TwitterAuth;
