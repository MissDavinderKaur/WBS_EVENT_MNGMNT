import mongoose from "mongoose";
import dotenv from "dotenv";
import { Event } from "../models/Event";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wbs-events";

function addDays(d: Date, days: number) {
  const n = new Date(d);
  n.setDate(n.getDate() + days);
  return n;
}

function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB for seeding");

  // remove prior seed entries for these titles to avoid duplicates
  await Event.deleteMany();

  const events: Array<any> = [];

  const start = new Date(2026, 5, 1); // June 1, 2026
  const end = new Date(2026, 11, 31); // Dec 31, 2026

  // Sprint cadence events (every 2 weeks) from June -> Dec
  for (let d = new Date(start); d <= end; d = addDays(d, 14)) {
    const date = formatDate(d);
    events.push({ date, time: "09:00", duration: 60, title: "Sprint Planning", owner: "Bob", role: "Product Owner" });
    events.push({ date, time: "13:00", duration: 60, title: "Sprint Review", owner: "Bob", role: "Product Owner" });
    events.push({ date, time: "16:00", duration: 60, title: "Sprint Retro", owner: "Ada", role: "Engineering Manager" });
  }

  // Backlog Grooming every 4 weeks starting June
  for (let d = new Date(start); d <= end; d = addDays(d, 28)) {
    const date = formatDate(d);
    events.push({ date, time: "11:00", duration: 90, title: "Backlog Grooming", owner: "Bob", role: "Product Owner" });
  }

  // Daily Scrum every workday for June 2026 only
  const juneStart = new Date(2026, 5, 1);
  const juneEnd = new Date(2026, 5, 30);
  const dailyScrumOwners = ["Carla", "Dave", "Eleanor", "Fred"];
  let ownerIndex = 0;
  for (let d = new Date(juneStart); d <= juneEnd; d = addDays(d, 1)) {
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5) {
      const owner = dailyScrumOwners[ownerIndex % dailyScrumOwners.length];
      ownerIndex += 1;
      events.push({ date: formatDate(d), time: "09:00", duration: 15, title: "Daily Scrum", owner: owner, role: "Engineer" });
    }
  }

  // Refinement every Tuesday and Thursday for June 2026 only
  for (let d = new Date(juneStart); d <= juneEnd; d = addDays(d, 1)) {
    const dow = d.getDay();
    // Tuesday=2, Thursday=4
    if (dow === 2 || dow === 4) {
      events.push({ date: formatDate(d), time: "15:00", duration: 60, title: "Refinement", owner: "Ada", role: "Engineering Manager" });
    }
  }

  if (events.length === 0) {
    console.log("No events to insert");
    await mongoose.disconnect();
    return;
  }

  const inserted = await Event.insertMany(events);
  console.log(`Inserted ${inserted.length} events`);

  await mongoose.disconnect();
  console.log("Disconnected");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
