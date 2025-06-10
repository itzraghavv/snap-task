import z from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20),
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
