"use client";
import { useState } from "react";
import { Title } from "../_components/title";
import { ExitIcon } from "../_icons/exitIcon";
import { RestartQuiz } from "../_components/restartQuiz";
import { useRouter } from "next/navigation";
type Quiz = {
  options: string[];
  question: string;
  answer: string;
};
type MyProps = {
  onNext: () => void;
  data: Quiz;
  current: number;
  total: number;
};

export const QuickTest = ({ onNext, data, current, total }: MyProps) => {
  const [restartQuizState, setRestartQuizState] = useState(false);
  const router = useRouter();
  return (
    <div className="w-full h-full bg-zinc-100 flex justify-center pt-[120px]">
      <div className="w-[558px] h-72 gap-5 flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Title title="Quick test" />
            <p className="text-[16px] font-medium text-zinc-400">
              Take a quick test about your knowledge from your content
            </p>
          </div>
          <button
            className="bg-white w-12 h-10 border border-zinc-200 rounded-lg cursor-pointer flex items-center justify-center"
            onClick={() => setRestartQuizState(true)}
          >
            <ExitIcon />
          </button>
          {restartQuizState && (
            <RestartQuiz
              goBack={() => setRestartQuizState(false)}
              goHome={() => {
                router.push("/");
                localStorage.removeItem("quick test");
              }}
            />
          )}
        </div>
        <div className="bg-white h-fit w-fit rounded-lg border border-zinc-200 p-7 flex flex-col gap-5">
          <div className="flex items-center gap-12 w-full">
            <p className="text-black text-[20px] font-medium">
              {data?.question}
            </p>
            <p className="text-[20px] text-black font-medium flex gap-1 items-baseline shrink-0">
              {current}
              <span className="text-[16px] text-zinc-400 font-medium">
                {`/ ${total}`}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-y-4">
            {data?.options.map((options, index) => {
              return (
                <button
                  className="w-[243px] h-10 rounded-lg border border-zinc-200 flex cursor-pointer justify-center items-center text-black text-[14px] font-medium"
                  key={index}
                  onClick={onNext}
                >
                  {options}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
