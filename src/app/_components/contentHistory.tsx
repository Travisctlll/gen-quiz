"use client";
import { ExitIcon } from "../_icons/exitIcon";

type MyProps = {
  closeModal: () => void;
  content: string;
  title: string;
};

export const ContextHistory = ({ closeModal, content, title }: MyProps) => {
  return (
    <div className="w-full h-screen fixed z-50 bg-[rgba(0,0,0,0.5)] top-0 left-0 flex justify-center items-center">
      <div className="bg-white w-[628px] h-[492px] rounded-lg flex flex-col p-7 justify-between">
        <div className="flex items-center justify-between">
          <p className="text-[24px] font-semibold text-black">{title}</p>
          <button
            className="bg-white w-12 h-10 rounded-lg border border-zinc-200 cursor-pointer flex items-center justify-center"
            onClick={closeModal}
          >
            <ExitIcon />
          </button>
        </div>
        <div className="w-full h-[380px] overflow-y-scroll text-[14px] font-normal text-black">
          {content}
        </div>
      </div>
    </div>
  );
};
