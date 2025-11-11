
/**
 * This interface is a one-to-one mapping of gemini.schema.ts
 * @see src/types/gemini.schema.ts
 */
export interface GeminiRestaurantQueryResponse {
  query: string;
  near?: string;

  /**
   * Indicates if the message could not be parsed or more information is needed
   * When true, the restaurant search should not be performed
   * @optional
   */
  unparsable?: boolean;
}