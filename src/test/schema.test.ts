import { expect, test } from "bun:test";
import zodToJsonSchema from "zod-to-json-schema";
import { querySchema } from "../types/gemini.schema";

test("Sample test for schema", () => {
  const testSchema = querySchema;
  const jsonSchema = zodToJsonSchema(testSchema);
  expect(jsonSchema).toBeDefined();

  const anyJsonSchema = jsonSchema as any;

  // must have near and query
  expect(anyJsonSchema.properties).toHaveProperty("query");
  expect(anyJsonSchema.properties).toHaveProperty("near");
});
