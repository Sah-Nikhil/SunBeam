import { z } from "zod";

export const LibrarySchema = z.object({
  Book_Title: z.string().min(1, "Title is required"),
  Author: z.string().min(1, "Author is required"),
  Series: z.string().optional(),
  Publisher: z.string().optional(),
  ISBN_number: z.number().optional(),
  Genre: z.string().optional(),
  Language: z.string().optional(),
  Year_Published: z.number().optional(),
  Total_Copies: z.number().optional(),
  Available_Copies: z.number().optional(),
  Price____: z.number().optional(),
});

export type LibraryInput = z.infer<typeof LibrarySchema>;
