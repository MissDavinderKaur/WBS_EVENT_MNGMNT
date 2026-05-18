import { z } from "zod";

export const EventSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.number({ error: "Duration must be a number" }).positive("Duration must be positive"),
  title: z.string().min(1, "Title is required").max(200),
  agenda: z.string().optional(),
  owner: z.string().min(1, "Owner is required").max(100),
});