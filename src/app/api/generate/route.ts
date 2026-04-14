import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

const geminiApi = new GoogleGenAI({
  apiKey: process.env.GEMINI_TOKEN,
});
// console.log(process.env.GEMINI_TOKEN, "token");

export const POST = async (req: NextRequest) => {
  try {
    const { articleTitle, articleContent, articleId } = await req.json();

    if (!articleTitle) {
      return NextResponse.json({ err: "No article title" }, { status: 400 });
    }
    if (!articleContent) {
      return NextResponse.json({ err: "No article content" }, { status: 400 });
    }
    console.log("hi");

    const prompt = `You are a backend API that returns raw JSON only.

STRICT RULES (VERY IMPORTANT):
- Do NOT use markdown.
- Do NOT wrap the response in \`\`\`.
- Do NOT include the word "json".
- Do NOT include explanations, comments, or extra text.
- Your response MUST start with { and end with }.
- The response MUST be valid JSON parsable by JSON.parse().

TASK:
- Read the article title and article content.
- Generate EXACTLY 5 quiz questions.

Each quiz object MUST contain:
- "question": string
- "choices": array of EXACTLY 4 strings
- "correctAnswer": one of the choices (string)

RESPONSE FORMAT (exactly this shape):

{
  "tests": [
    {
      "question": "string",
      "choices": ["A", "B", "C", "D"],
      "correctAnswer": "A"
    }
  ]
}

Article title:
${articleTitle}

Article content:
${articleContent}`;

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
    console.log("hi2");

    const optionsAndAnswer =
      res?.candidates?.[0]?.content?.parts?.[0].text ?? "";
    const safe = optionsAndAnswer
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    let parsed;

    try {
      parsed = JSON.parse(safe);
    } catch (err) {
      console.error(err, "json parse error");
      return NextResponse.json(
        { err: "AI did not return valid JSON" },
        { status: 500 }
      );
    }
    try {
      const create = await prisma.quiz.createMany({
        data: parsed.tests.map((data: any) => ({
          question: data.question,
          options: data.choices,
          answer: data.correctAnswer,
          articleId: articleId,
        })),
      });
      const quizzes = await prisma.quiz.findMany({
        where: { articleId },
      });
      return NextResponse.json({ quizzes }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ err }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
};
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");
  if (!articleId) {
    return new Response(JSON.stringify({ err: "articleId is required" }), {
      status: 400,
    });
  }
  const getQuizzes = await prisma.quiz.findMany({
    where: { articleId: articleId },
  });
  return Response.json(getQuizzes, { status: 200 });
};
