import { envSchema } from "../types/config.schema";

const parsedSchema = envSchema.safeParse(process.env);

if (!parsedSchema.success) {
  console.error(
    "Environment not configured properly:",
    parsedSchema.error.format()
  );
  process.exit(1);
}

export const config = parsedSchema.data;
