"use client";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export const Header = () => {
  const router = useRouter();
  return (
    <div className="bg-white w-full h-14 border-b flex items-center justify-between px-6 border-zinc-200 shrink-0">
      <button
        className="font-semibold text-[24px] text-black cursor-pointer"
        onClick={() => router.push("/")}
      >
        Quiz app
      </button>
      <div className="flex gap-3 text-black">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
