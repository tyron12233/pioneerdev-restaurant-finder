import { config } from "../utils/config";

export interface FoursquareSearchParams {
  query: string;
  near?: string;
  open_now?: boolean;
  open_at?: string;
  min_price?: number;
  max_price?: number;
  sort: "DISTANCE" | "RELEVANCE" | "RATING" | "POPULARITY";
}

export interface FoursquareRestuarant {
  name: string;
  fsq_id: string;
  latitude: number;
  longitude: number;
  website?: string;

  location: {
    formatted_address: string;
  };
}

export interface FoursquareSearchResponse {
  results: Array<FoursquareRestuarant>;
}

export const foursquareClient = {
  /**
   *
   * @param params
   * @returns
   */
  async searchRestuarants(
    params: FoursquareSearchParams
  ): Promise<FoursquareSearchResponse> {
    // foursqaure v3 places search is deprecated
    // api.foursquare.com/v3/places/search -> places-api.foursquare.com/places/search
    // migration guide: https://docs.foursquare.com/fsq-developers-places/reference/migration-guide
    const baseUrl = "https://places-api.foursquare.com/places/search";
    const queryParams = new URLSearchParams();
    queryParams.append("query", params.query);
    if (params.near) {
      queryParams.append("near", params.near);
    }
    if (params.open_now !== undefined) {
      queryParams.append("open_now", params.open_now ? "true" : "false");
    }
    if (params.sort) {
      queryParams.append("sort", params.sort);
    }
    if (params.min_price !== undefined) {
      queryParams.append("min_price", params.min_price.toString());
    }
    if (params.max_price !== undefined) {
      queryParams.append("max_price", params.max_price.toString());
    }
    if (params.open_at) {
      queryParams.append("open_at", params.open_at);
    }

    const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
      headers: {
        Authorization: "Bearer " + config.FOURSQUARE_API_KEY,
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
