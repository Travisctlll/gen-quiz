"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Results } from "../_components/results";
import { Title } from "../_components/title";
import { BookMarkIcon } from "../_icons/bookMarkIcon";
import { RestartIcon } from "../_icons/restartIcon";

type MyProps = {
  backToHome: () => void;
  restartQuiz: () => void;
  fetch: () => void;
  currentIndex: () => void;
};

type MyResults = {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  correct: boolean;
};

export const TestResult = ({
  backToHome,
  restartQuiz,
  fetch,
  currentIndex,
}: MyProps) => {
  const [results, setResults] = useState<MyResults[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("quick test");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  const handleRestartQuiz = () => {
    localStorage.removeItem("quick test");
    restartQuiz();
    currentIndex();
    fetch();
  };

  const saveAndLeave = () => {
    localStorage.removeItem("quick test");
    backToHome();
  };

  const numOfCorrAnswer = results.filter((cor) => cor.correct).length;

  return (
    <div className="w-full h-full bg-zinc-100 flex flex-col gap-6 items-center pt-[120px]">
      <div className="flex flex-col w-[428px] h-16 justify-between">
        <Title title="Quiz completed" />
        <p className="text-[16px] text-zinc-400 font-medium">
          Let’s see what you did
        </p>
      </div>
      <div className="w-[428px] h-[528px] bg-white rounded-lg border border-zinc-200 p-7 flex flex-col gap-7">
        <p className="text-black text-[24px] font-medium">
          Your score: {numOfCorrAnswer}
          <span className="text-[16px] text-zinc-400 font-normal">/ 5</span>
        </p>
        <div className="flex flex-col justify-between h-[344px] overflow-y-scroll">
          {results.map((data, index) => {
            return <Results key={index} data={data} quesNumber={index + 1} />;
          })}
        </div>
        <div className="w-full flex justify-between">
          <button
            className="w-44 h-10 border border-zinc-200 bg-white cursor-pointer flex justify-center items-center text-black font-medium gap-2 btn-shadcn btn-outline"
            onClick={handleRestartQuiz}
          >
            <RestartIcon /> Restart quiz
          </button>
          <button
            className="bg-black w-44 h-10 cursor-pointer flex justify-center items-center text-white font-medium rounded-lg gap-2 btn-shadcn"
            onClick={saveAndLeave}
          >
            <BookMarkIcon /> Save and leave
          </button>
        </div>
      </div>
    </div>
  );
};
