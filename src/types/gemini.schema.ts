import z from "zod";

export const querySchema = z
  .object({
    query: z
      .string()
      .describe("The search query string extracted from the message"),
    near: z
      .string()
      .optional()
      .describe(
        'A string naming a locality in the world (e.g., "Chicago, IL"). If the value is not geocodable, returns an error. Global search results will be omitted.'
      ),
  })
  .describe("Restaurant Query Schema");
