"use client";
import { useState } from "react";
import { SideBarIcon } from "../_icons/sideBarIcon";
import { SideBarOpened } from "./sideBarOpened";
import { ArticleGenerator } from "./articleGenerator";

export const SideBarAndGenerator = () => {
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
      <ArticleGenerator />
    </div>
  );
};
