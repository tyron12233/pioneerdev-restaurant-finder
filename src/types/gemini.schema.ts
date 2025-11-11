import z from "zod";

export const querySchema = z
  .object({
    unparsable: z
      .boolean()
      .optional()
      .describe(
        "Indicates if the message could not be parsed or more information is needed"
      ),
    sort: z
      .enum(["DISTANCE", "RELEVANCE", "RATING", "POPULARITY"])
      .describe(
        "Specifies the order in which results are returned. Valid values are DISTANCE, RELEVANCE, RATING, and POPULARITY."
      ),
    min_price: z
      .number()
      .optional()
      .describe(
        "Restricts results to only those places within the specified price range. Valid values range between 1 (most affordable) to 4 (most expensive), inclusive."
      ),
    max_price: z
      .number()
      .optional()
      .describe(
        "Restricts results to only those places within the specified price range. Valid values range between 1 (most affordable) to 4 (most expensive), inclusive."
      ),
    open_at: z
      .string()
      .optional()
      .describe(
        `Support local day and local time requests through this parameter. To be specified as DOWTHHMM (e.g., 1T2130), where DOW is the day number 1-7 (Monday = 1, Sunday = 7) and time is in 24 hour format.
        Places that do not have opening hours will not be returned if this parameter is specified. Cannot be specified in conjunction with open_now.`
      ),
    open_now: z.boolean().optional()
      .describe(`Restricts results to only those places that are open now.
      Places that do not have opening hours will not be returned if this parameter is specified. Cannot be specified in conjunction with open_at.`),
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
