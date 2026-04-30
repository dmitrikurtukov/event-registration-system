import z from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title cannot exceed 255 characters."),
  eventTime: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Event time must be in the future.",
  }),
  maxParticipants: z
    .number("Max participants is required.")
    .min(1, "At least 1 participant is required."),
});

export type CreateEventSchema = z.infer<typeof createEventSchema>;
