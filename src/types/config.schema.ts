import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  CODE_SECRET: z.string().min(1, "CODE_SECRET is required"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  FOURSQUARE_API_KEY: z.string().min(1, "FOURSQUARE_API_KEY is required"),
});