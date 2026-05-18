import mongoose, { Schema } from "mongoose";

export interface CalendarEvent {
  date: string;
  time: string;
  duration: number;
  title: string;
  agenda?: string;
  owner: string;
  role: "Engineer" | "Product Owner" | "Engineering Manager";
}

const eventSchema = new Schema<CalendarEvent>(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    title: { type: String, required: true },
    agenda: { type: String },
    owner: { type: String, required: true },
    role: { type: String, enum: ["Engineer", "Product Owner", "Engineering Manager"], required: true },
  },
  { timestamps: true }
);

export const Event = mongoose.model<CalendarEvent>("Event", eventSchema);
