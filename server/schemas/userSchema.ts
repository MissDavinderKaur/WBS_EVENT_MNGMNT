import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Engineer", "Product Owner", "Engineering Manager"]),
});

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
