import { expect, test } from "bun:test";
import { restaurantService } from "../services/restaurant.service";

test("Sample test for restaurant service", async () => {
  const results = await restaurantService.processMessage(
    "Find a pizza place near Caloocan City"
  );

  expect(results).toBeDefined();

  if (Array.isArray(results) && results.length > 0) {
    const firstResult = results[0];
    expect(firstResult).toHaveProperty("name");
    expect(firstResult).toHaveProperty("location");
  }
});
