// POST
// GET
// POST

import { NextResponse, NextRequest } from "next/server";
import { Webhook } from "svix";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, userId } = body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize the following article in 2 sentences",
        },
        {
          role: "user",
          content: content,
        },
      ],
    });

    const summary =
      response.choices[0].message.content ?? "No summary generated";
    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary,
        userId,
      },
    });
    return NextResponse.json(
      { message: "Succesful", article },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(
      { message: "Error creating article" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        user: true,
        quizzes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      { message: "Succesful", articles },
      { status: 200 },
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Failed"}, {status:400})
  }
}
