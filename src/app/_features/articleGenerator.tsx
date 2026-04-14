"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Title } from "../_components/title";
import { ArticleIcon } from "../_icons/articleIcon";
import { Spinner } from "@/components/ui/spinner";

export const ArticleGenerator = () => {
  const router = useRouter();
  const [articleTitle, setArticleTitle] = useState("");
  const [artcileContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user`, { method: "GET" });
      if (!res.ok) {
        setUserId(null);
        return;
      }
      const data = await res.json();
      if (data?.id) setUserId(data.id);
    } catch (err) {
      console.error(err);
    }
  };

  const returnArticle = async () => {
    if (!articleTitle) return;
    if (!artcileContent) return;
    if (!userId) {
      console.error("User not loaded yet");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: articleTitle,
          content: artcileContent,
          userId,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error(err, "error from server");
        return;
      }
      router.push(`/summary`);
    } catch (err) {
      console.error(err, "error from client");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-full bg-zinc-100 flex justify-center pt-12">
      <div className="w-[856px] h-[458px] border border-zinc-200 bg-white rounded-lg p-7 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Title title="Article Quiz Generator" />
          <p className="text-zinc-400 text-[16px] font-normal">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the
            <br /> sidebar for future reference.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex items-center text-zinc-400 text-[14px] font-semibold gap-1">
            <ArticleIcon />
            Article title
          </p>
          <textarea
            className="outline-none border border-zinc-200 w-[800px] min-h-10 max-h-10 rounded-lg text-[14px] font-normal text-black flex justify-start px-3 py-2"
            placeholder="Enter a title for your article..."
            onChange={(e) => setArticleTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex items-center text-zinc-400 text-[14px] font-semibold gap-1">
            <ArticleIcon />
            Article content
          </p>
          <textarea
            className="outline-none border border-zinc-200 w-[800px] min-h-[120px] max-h-[385px] rounded-lg text-[14px] font-normal text-black flex justify-start px-3 py-2 resize-none"
            placeholder="Paste your article content here..."
            onChange={(e) => setArticleContent(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="w-[800px] flex items-center justify-end">
          <button
            className={`w-40 h-10 rounded-lg flex items-center justify-center text-[14px] text-white font-medium ${
              artcileContent.length > 0 &&
              articleTitle.length > 0 &&
              userId
                ? "bg-black btn-shadcn"
                : "bg-zinc-200"
            } ${
              loading === true
                ? "bg-zinc-400 gap-2"
                : "cursor-pointer btn-shadcn"
            }`}
            onClick={returnArticle}
            disabled={loading || !userId}
          >
            {loading === true ? (
              <>
                <Spinner /> Generating...
              </>
            ) : (
              "Generate summary"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
