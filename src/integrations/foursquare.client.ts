export interface FoursquareSearchParams {
  query: string;
  near?: string;
}

export interface FoursquareRestuarant {
  name: string;
  fsq_id: string;
  latitude: number;
  longitude: number;
  website?: string;
}

export interface FoursquareSearchResponse {
  results: Array<FoursquareRestuarant>;
}

export const foursquareClient = {
  async searchRestuarants(
    params: FoursquareSearchParams
  ): Promise<FoursquareSearchResponse> {
    const apiKey = process.env.FOURSQUARE_API_KEY || "";
    if (!apiKey) {
      throw new Error("Foursquare API key is not configured");
    }

    // foursqaure v3 places search is deprecated
    // api.foursquare.com/v3/places/search -> places-api.foursquare.com/places/search
    // migration guide: https://docs.foursquare.com/fsq-developers-places/reference/migration-guide
    const baseUrl = "https://places-api.foursquare.com/places/search";
    const queryParams = new URLSearchParams();
    queryParams.append("query", params.query);
    if (params.near) {
      queryParams.append("near", params.near);
    }

    const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
      headers: {
        Authorization: "Bearer " + apiKey,
        Accept: "application/json",

        // Must provide version for Foursquare API
        "X-Places-Api-Version": "2025-06-17",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Foursquare API request failed with status ${response.status}: ${errorData.message}`
      );
    }

    const data = (await response.json()) as FoursquareSearchResponse;
    return data;
  },
};
