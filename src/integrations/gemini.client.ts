import { GoogleGenAI } from "@google/genai";
import zodToJsonSchema from "zod-to-json-schema";
import { GeminiRestaurantQueryResponse } from "../types/gemini.types";
import { querySchema as geminiQuerySchema } from "../types/gemini.schema";
import { config } from "../utils/config";

const googleAi = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});
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
        responseJsonSchema: zodToJsonSchema(geminiQuerySchema),
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
    return geminiQuerySchema.parse(JSON.parse(response.text ?? ""));
  },
};
