import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return new Response("Error creating user", { status: 500 });
  }
} 
