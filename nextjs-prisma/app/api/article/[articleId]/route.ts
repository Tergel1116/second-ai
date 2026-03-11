import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { articleId: string } },
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.articleId },
      include: { user: true, quizzes: true },
    });

    if (!article) {
      return NextResponse.json(
        {
          message: "Article not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
