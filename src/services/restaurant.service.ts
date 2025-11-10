import {
  foursquareClient,
  FoursquareRestuarant,
} from "../integrations/foursquare.client";
import { geminiClient } from "../integrations/gemini.client";

export const restaurantService = {
  async processMessage(message: string): Promise<FoursquareRestuarant[]> {
    const llmQuery = await geminiClient.processMessage(message);

    if (!llmQuery) {
      throw new Error("LLM: Failed to extract query parameters from message");
    }

    console.log("LLM Extracted Query:", llmQuery);

    const results = await foursquareClient.searchRestuarants(llmQuery);
    return results.results;
  },
};
