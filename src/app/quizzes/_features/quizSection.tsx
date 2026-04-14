"use client";
import { SideBarOpened } from "@/app/_features/sideBarOpened";
import { SideBarIcon } from "@/app/_icons/sideBarIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { QuickTestFromHistory } from "../_components/quickTestFromHistoy";
import { TestResult } from "@/app/_features/testResult";

export const QuizSection = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [sideBarState, setSideBarState] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const getQuizzes = async () => {
    setLoading(true);
    const controller = new AbortController();
    const timeOutId = setTimeout(() => {
      controller.abort();
    }, 5000);
    try {
      const data = await (
        await fetch(`/api/generate?articleId=${id}`, {
          method: "GET",
          signal: controller.signal,
        })
      ).json();
      setQuizData(data);
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.error("Fetch timeOut");
      } else {
        console.error(err);
      }
    } finally {
      clearTimeout(timeOutId);
      setLoading(false);
    }
  };
  useEffect(() => {
    getQuizzes();
  }, [step]);

  const nextTest = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === 4) {
      setStep(4);
    }
  };

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
      {step === 1 && (
        <QuickTestFromHistory
          onNext={nextTest}
          data={quizData[currentIndex]}
          current={currentIndex + 1}
          total={5}
          loading={loading}
        />
      )}
      {step === 4 && (
        <TestResult
          restartQuiz={() => setStep(1)}
          fetch={getQuizzes}
          backToHome={() => router.push("/")}
          currentIndex={() => setCurrentIndex(0)}
        />
      )}
    </div>
  );
};
