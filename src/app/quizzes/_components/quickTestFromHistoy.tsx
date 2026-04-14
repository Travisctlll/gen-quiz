"use client";
import { RestartQuiz } from "@/app/_components/restartQuiz";
import { Title } from "@/app/_components/title";
import { ExitIcon } from "@/app/_icons/exitIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
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
  loading: boolean;
};

export const QuickTestFromHistory = ({
  onNext,
  data,
  current,
  total,
  loading,
}: MyProps) => {
  const router = useRouter();
  const [restartQuizState, setRestartQuizState] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    const stored = localStorage.getItem("quick test");
    const prev = stored ? JSON.parse(stored) : [];
    const result = {
      question: data.question,
      yourAnswer: option,
      correctAnswer: data.answer,
      correct: data.answer === option,
    };
    localStorage.setItem("quick test", JSON.stringify([...prev, result]));
    onNext();
  };

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
              goHome={() => {
                localStorage.removeItem("quick test");
                router.push("/");
              }}
              goBack={() => setRestartQuizState(false)}
            />
          )}
        </div>
        {loading === true ? (
          <div className="bg-white h-fit w-[558px] rounded-lg border border-zinc-200 p-7 flex flex-col gap-5">
            <div className="flex items-center gap-12 w-full justify-between">
              <Skeleton className="w-[350px] h-[30px]" />
              <Skeleton className="w-8 h-[30px]" />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>
        ) : (
          <div className="bg-white h-fit w-fit min-w-[558px] rounded-lg border border-zinc-200 p-7 flex flex-col gap-5">
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
            <div className="flex flex-col gap-y-4">
              {data?.options.map((options, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(options)}
                    className="cursor-pointer min-w-[243px] h-10 px-4 rounded-lg border border-zinc-200 text-black text-[14px] font-medium flex items-center justify-center 
                    transition-all duration-300 ease-out bg-white hover:bg-black hover:text-white hover:border-black hover:-translate-y-0.5  hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.35)] active:translate-y-0 active:scale-[0.98]"
                  >
                    {options}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
