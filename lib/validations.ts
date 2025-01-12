import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Fullname is too short"),
  email: z.string().email("Invalid email address"),
  universityId: z.coerce.number(),
  universityCard: z.string().min(3, "University card is required"),
  password: z.string().min(8, "Password is too short"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is too short"),
});

export const createBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title is too short")
    .max(100, "Title is too long"),
  description: z.string().trim().min(10, "Description is too short"),
  author: z
    .string()
    .trim()
    .min(3, "Author is too short")
    .max(100, "Author is too long"),
  genre: z
    .string()
    .trim()
    .min(3, "Genre is too short")
    .max(50, "Genre is too long"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating is too low")
    .max(5, "Rating is too high"),
  totalCopies: z.coerce
    .number()
    .int()
    .positive()
    .lte(10000, "Total copies is too high"),
  coverUrl: z.string().trim().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color code"),
  videoUrl: z.string().trim().nonempty(),
  summary: z.string().trim().min(10, "Summary is too short"),
});
