import { z } from 'zod'

export const bookSchema = z.object({
  Book_Title: z.string().min(1, "Book title is required"),
  Author: z.string().min(1, "Author is required"),
  Series: z.string().optional().nullable(),
  Publisher: z.string().optional().nullable(),
  Genre: z.string().optional().nullable(),
  Language: z.string().optional().nullable(),
  Year_Published: z.number().int().optional().nullable(),
  Total_Copies: z.number().int().min(1, "At least one copy is required"),
  Available_Copies: z.number().int().optional(),
  Price: z.number().optional().nullable(),
});

export type BookFormValues = z.infer<typeof bookSchema>

export const defaultBookValues: BookFormValues = {
  Book_Title: "",
  Author: "",
  Series: "",
  Publisher: "",
  Genre: "",
  Language: "",
  Year_Published: null,
  Total_Copies: 1,
  Available_Copies: 0,
  Price: null,
};
