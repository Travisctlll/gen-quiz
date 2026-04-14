import { GoogleGenAI } from "@google/genai";
import prisma from "../../../../lib/prisma";

const geminiApi = new GoogleGenAI({
  apiKey: process.env.GEMINI_TOKEN,
});

export const POST = async (req: Request) => {
  try {
    const { title, content, userId } = await req.json();
    if (!userId || !title || !content) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const prompt = `Please provide a concise summary of the following article: ${content}`;
    const res = await geminiApi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });
    const summarizedContent =
      res?.candidates?.[0]?.content?.parts?.[0].text ?? "";
    const create = await prisma.article.create({
      data: {
        title: title,
        content: content,
        summary: summarizedContent,
        userId: userId,
      },
    });
    return Response.json(create);
  } catch (err) {
    console.log(err, "server error");
    return Response.json({ err }, { status: 500 });
  }
};
export const GET = async () => {
  const article = await prisma.article.findFirst({
    orderBy: {
      createdt: "desc",
    },
  });
  return Response.json(article);
};
