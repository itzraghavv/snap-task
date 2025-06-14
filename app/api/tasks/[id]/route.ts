import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const taskId = parseInt(await params.id);

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
