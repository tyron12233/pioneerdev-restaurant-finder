import { GoogleGenAI, Type } from "@google/genai";
import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { GeminiRestaurantQueryResponse } from "../types/gemini.types";

const googleAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

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

export const geminiClient = {
  /**
   *
   * @param message The message to be processed
   * @returns A promise containing the parsed response from the message
   */
  async processMessage(
    message: string
  ): Promise<GeminiRestaurantQueryResponse | null> {
    const response = await googleAi.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(querySchema),
        systemInstruction:
          "You are an assistant that extracts search parameters for finding restaurants from user messages. Respond only with a JSON object matching the specified schema. Provide near if a location is specified in the message.",
      },
      contents: {
        text:
          "Extract restaurant search parameters from the following message: " +
          message,
      },
    });

    console.log("Gemini Response:", response.text);
    return querySchema.parse(JSON.parse(response.text ?? ""));
  },
};
