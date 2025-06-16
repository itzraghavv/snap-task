import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const taskId = parseInt((await params).id);

  try {
    await prisma.tasks.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const taskId = parseInt((await params).id);
  const { title, description, priority, dueDate } = await req.json();

  try {
    const updatedTask = await prisma.tasks.update({
      where: { id: taskId },
      data: {
        title,
        description,
        priority,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
