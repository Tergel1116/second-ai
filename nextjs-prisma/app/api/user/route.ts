import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  // try {
  //   const { email, password } = await request.json();
  //   return NextResponse.json({ message: "User created successfully" });
  // } catch (error) {
  //   return new Response("Error creating user", { status: 500 });
  // }
  const webhookSecret = process.env.CLERK_WEBHOOK_KEY;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook secret" },
      { status: 400 },
    );
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing headers" }, { status: 400 });
  }

  const webhook = new Webhook(webhookSecret);

  const body = await req.text();

  try {
    const event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 500 },
    );
  }
}
