import { foursquareClient } from "../integrations/foursquare.client";

export const restaurantService = {
  async processMessage(message: string): Promise<void> {
    const results = await foursquareClient.searchRestuarants({
      query: message,
    });
    console.log("Foursquare Search Results:", results);
  },
};
