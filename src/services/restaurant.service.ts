import {
  foursquareClient,
  FoursquareRestuarant,
} from "../integrations/foursquare.client";
import { geminiClient } from "../integrations/gemini.client";

export const restaurantService = {

  /**
   * Processes the raw message string.
   * 
   * Message is processed through gemini, which is then passed 
   * to the foursquare api.
   */
  async processMessage(message: string): Promise<FoursquareRestuarant[]> {
    const llmQuery = await geminiClient.processMessage(message);

    if (!llmQuery) {
      throw new Error("LLM: Failed to extract query parameters from message");
    }

    const results = await foursquareClient.searchRestuarants(llmQuery);
    return results.results;
  },
};
