import { SignUpSchema } from "@/lib/validator";
import prisma from "@/prisma/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const validData = SignUpSchema.safeParse({ username, email, password });

  if (!validData.success) {
    return NextResponse.json(
      {
        message: "Invalid Input",
        error: validData.error,
      },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        message: "User with this Email already exists",
      },
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json(
    {
      message: "User Created",
      userId: user.id,
    },
    { status: 200 }
  );
}
