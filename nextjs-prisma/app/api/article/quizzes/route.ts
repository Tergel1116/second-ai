import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { articleId: string } },
) {
  try {
    const { quizzes } = await req.json();

    const result = await prisma.quiz.createMany({
      data: quizzes.map((q: any) => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        articleId: params.articleId,
      })),
    });
    if (!quizzes || !Array.isArray(quizzes)) {
      return NextResponse.json(
        { error: "Invalid quizzes data" },
        { status: 400 },
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create quizzes" },
      { status: 500 },
    );
  }
}
