import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  emailVerified: z.date(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;

export const requestOtpSchema = z.object({
  email: z.string(),
  redirect: z.string().default("/"),
});

export const verifyOtpSchema = z.object({
  hash: z.string(),
});
