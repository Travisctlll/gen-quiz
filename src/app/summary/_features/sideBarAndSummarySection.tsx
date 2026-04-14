"use client";
import { useRouter } from "next/navigation";
import { SideBarOpened } from "@/app/_features/sideBarOpened";
import { SideBarIcon } from "@/app/_icons/sideBarIcon";
import { useState } from "react";
import { SummarySection } from "./summary";

export const SideBarAndSummarySection = () => {
  const router = useRouter();
  const [sideBarState, setSideBarState] = useState(false);

  return (
    <div className="flex w-full h-full">
      <div
        className={`h-full bg-white border-r border-zinc-200 transition-all duration-300 ease-in-out`}
        style={{
          width: sideBarState ? "300px" : "72px",
        }}
      >
        {sideBarState ? (
          <SideBarOpened sideBarClose={() => setSideBarState(false)} />
        ) : (
          <button
            className="cursor-pointer px-6 pt-6 w-fit h-fit opacity-100"
            onClick={() => setSideBarState(true)}
          >
            <SideBarIcon />
          </button>
        )}
      </div>
      <SummarySection goPrev={() => router.push("/")} />
    </div>
  );
};
