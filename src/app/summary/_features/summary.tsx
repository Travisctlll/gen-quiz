"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";
import { PreIcon } from "@/app/_icons/preIcon";
import { Title } from "@/app/_components/title";
import { SummarizedIcon } from "@/app/_icons/summarizedIcon";
import { ContextHistory } from "@/app/_components/contentHistory";

type MyProps = {
  goPrev: () => void;
};

type ArticleData = {
  id: string;
  content: string;
  title: string;
  summary: string;
};

export const SummarySection = ({ goPrev }: MyProps) => {
  const router = useRouter();
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/articles", { method: "GET" });
      if (!res.ok) {
        setArticleData(null);
        return;
      }
      const data = await res.json();
      setArticleData(data ?? null);
    } catch (err) {
      console.log(err);
    }
  };

  const quizGenerator = async () => {
    setLoading(true);
    try {
      const data = await (
        await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            articleTitle: articleData?.title,
            articleContent: articleData?.content,
            articleId: articleData?.id,
          }),
        })
      ).json();
      router.push(`/quizzes/${articleData?.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!articleData) {
    return (
      <div className="w-full h-full flex flex-col bg-zinc-100 pt-12 items-center gap-6">
        <div className="flex justify-start w-[856px]">
          <button
            className="bg-white w-12 h-10 rounded-lg border border-zinc-200 cursor-pointer flex items-center justify-center"
            onClick={goPrev}
          >
            <PreIcon />
          </button>
        </div>
        <div className="w-[856px] min-h-[180px] bg-white border border-zinc-200 rounded-lg p-7 flex flex-col gap-2">
          <Title title="Article Quiz Generator" />
          <p className="text-zinc-500 text-[14px]">
            No summary found yet. Create an article first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-zinc-100 pt-12 items-center gap-6">
      <div className="flex justify-start w-[856px]">
        <button
          className="bg-white w-12 h-10 rounded-lg border border-zinc-200 cursor-pointer flex items-center justify-center"
          onClick={goPrev}
        >
          <PreIcon />
        </button>
      </div>
      <div className="w-[856px] min-h-[356px] bg-white border border-zinc-200 rounded-lg p-7 flex flex-col gap-5">
        <Title title="Article Quiz Generator" />
        <div className="flex flex-col gap-2 h-fit">
          <p className="flex items-center text-zinc-400 text-[14px] font-semibold gap-1">
            <SummarizedIcon />
            Summarized content
          </p>
          <p className="flex items-center text-black text-[24px] font-semibold gap-2">
            {articleData.title}
          </p>
          <div className="w-[800px] min-h-[120px] max-h-[252px] overflow-y-scroll text-[14px] font-normal text-black">
            {articleData.summary}
          </div>
        </div>
        <div className="flex w-[800px] justify-between items-center">
          <button
            className="w-[120px] h-10 border border-zinc-200 rounded-lg cursor-pointer flex justify-center font-medium text-[14px] text-black btn-shadcn btn-outline"
            onClick={() => setState(true)}
          >
            See content
          </button>
          <button
            disabled={loading}
            className={`min-w-[108px] h-10 rounded-lg flex justify-center items-center font-medium text-[14px] text-white px-3
              ${
                loading === true
                  ? "bg-zinc-400 gap-2"
                  : "cursor-pointer bg-black btn-shadcn"
              }`}
            onClick={quizGenerator}
          >
            {loading === true ? (
              <>
                <Spinner /> Generating...
              </>
            ) : (
              "Take a quiz"
            )}
          </button>
        </div>
      </div>
      {state && (
        <ContextHistory
          closeModal={() => setState(false)}
          content={articleData.content}
          title={articleData.title}
        />
      )}
    </div>
  );
};
