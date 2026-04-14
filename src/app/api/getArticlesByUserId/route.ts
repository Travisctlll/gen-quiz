import prisma from "../../../../lib/prisma";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({ error: "userId required" }, { status: 400 });
  }
  try {
    const articles = await prisma.article.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdt: "desc",
      },
    });
    return Response.json({ articles }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ err: "server error" }, { status: 500 });
  }
};
