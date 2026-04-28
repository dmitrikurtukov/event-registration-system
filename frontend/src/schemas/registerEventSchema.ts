import z from "zod";

export const registerEventSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(100, "First name cannot exceed 100 characters."),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .max(100, "Last name cannot exceed 100 characters."),
  personalCode: z
    .string()
    .min(1, "Personal code is required.")
    .regex(/^\d{11}$/, "Personal code must be exactly 11 digits."),
});

export type RegisterEventSchema = z.infer<typeof registerEventSchema>;
