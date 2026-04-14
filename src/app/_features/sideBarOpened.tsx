"use client";
import { SideBarIcon } from "../_icons/sideBarIcon";
import { GeneratorHistoy } from "../_components/generatorHistory";
type MyProps = {
  sideBarClose: () => void;
};
export const SideBarOpened = ({ sideBarClose }: MyProps) => {
  return (
    <div
      className={`w-[300px] max-h-full bg-white border-r border-zinc-200 flex flex-col p-4 overflow-y-scroll`}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between w-full h-10">
          <p className="text-[20px] text-black font-semibold">History</p>
          <button className="cursor-pointer w-fit h-fit" onClick={sideBarClose}>
            <SideBarIcon />
          </button>
        </div>
        <GeneratorHistoy />
      </div>
    </div>
  );
};
