import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { title, description, priority, dueDate } = await req.json();

  const newTask = await prisma.tasks.create({
    data: {
      title,
      description,
      priority,
      dueDate: new Date(dueDate),
      userId: user.id,
    },
  });

  return NextResponse.json(newTask, { status: 201 });
}
