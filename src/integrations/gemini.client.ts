import { GoogleGenAI } from "@google/genai";
import zodToJsonSchema from "zod-to-json-schema";
import { GeminiRestaurantQueryResponse } from "../types/gemini.types";
import { querySchema as geminiQuerySchema } from "../types/gemini.schema";
import { config } from "../utils/config";

const SYSTEM_INSTRUCTION = 'You are an assitant that extracts search ' + 
'parameters for finding restaurants from a user message.'

const googleAi = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});

export const geminiClient = {
  /**
   * Processes the raw string using the Gemini API.
   * This uses the responseJsonSchema parameter consumed by Gemini
   * to make sure that the response adheres to what the Foursquare API.
   * 
   * @param message The message to be processed
   * @returns A promise containing the parsed response from the message
   */
  async processMessage(
    message: string
  ): Promise<GeminiRestaurantQueryResponse> {
    const response = await googleAi.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(geminiQuerySchema),
        systemInstruction: SYSTEM_INSTRUCTION
      },
      contents: {
        text: message,
      },
    });

    if (!response.text) {
      throw new Error("Gemini API did not return any result.")
    }

    const safeParse = geminiQuerySchema.safeParse(JSON.parse(response.text));

    if (!safeParse.success) {
      throw new Error("INTERNAL ERROR: Gemini returned an output that does not adhere to the schema: " + safeParse.error.format())
    }

    return safeParse.data as GeminiRestaurantQueryResponse;
  },
};
