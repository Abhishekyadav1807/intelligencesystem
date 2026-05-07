import { z } from "zod";

const numberField = z.coerce.number().finite().nonnegative();

export const ingestSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  level_standardized: z.string().min(2),
  location: z.string().min(1).optional().default("unknown"),
  experience_years: z.coerce.number().min(0).max(50).optional().default(0),
  base_salary: numberField,
  bonus: numberField.optional().default(0),
  stock: numberField.optional().default(0),
  confidence: z.coerce.number().min(0).max(1)
});
