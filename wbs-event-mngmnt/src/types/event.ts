import { z } from "zod";

export const EventSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.number({ error: "Duration must be a number" }).positive("Duration must be positive"),
  title: z.string().min(1, "Title is required").max(200),
  agenda: z.string().optional(),
  owner: z.string().min(1, "Owner is required"),
  role: z.enum(["Engineer", "Product Owner", "Engineering Manager"]),
});

export interface CalendarEvent {
  _id: string;
  date: string;
  time: string;
  duration: number;
  title: string;
  agenda?: string;
  owner: string;
  role: "Engineer" | "Product Owner" | "Engineering Manager";
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEventFormData {
  date: string;
  time: string;
  duration: number | 15;
  title: string;
  agenda: string;
  owner: string;
  role: "Engineer" | "Product Owner" | "Engineering Manager";
}
