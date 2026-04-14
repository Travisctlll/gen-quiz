"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Article = {
  title: string;
  id: string;
  createdt: Date;
};

export const GeneratorHistoy = () => {
  const router = useRouter();
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`/api/getArticlesByUserId?userId=${userId}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setArticleData(data.articles);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.error("Fetch timeout");
      } else {
        console.error(err);
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  const now = new Date();

  const getLabel = (createdAt: Date) => {
    const diffMs = now.getTime() - new Date(createdAt).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  const groupedArticles = articleData.reduce(
    (acc: Record<string, Article[]>, article) => {
      const label = getLabel(article.createdt);
      if (!acc[label]) acc[label] = [];
      acc[label].push(article);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-5">
      {loading ? (
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[21px] w-[100px]" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-[200px] pl-2" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.entries(groupedArticles).map(([label, articles]) => (
            <div key={label} className="flex flex-col gap-1">
              <p className="font-normal text-[14px] text-zinc-400">{label}</p>
              {articles.map((data) => (
                <button
                  key={data.id}
                  className="w-fit font-medium text-[16px] text-black text-start flex pl-2 cursor-pointer btn-underline"
                  onClick={() => router.push(`/history/${data.id}`)}
                >
                  {data.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
