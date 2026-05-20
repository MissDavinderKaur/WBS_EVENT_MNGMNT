import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wbs-events";
const PASSWORD = "password123";
const users = [
  { username: "Ada", role: "Engineering Manager" as const },
  { username: "Bob", role: "Product Owner" as const },
  { username: "Carla", role: "Engineer" as const },
  { username: "Dave", role: "Engineer" as const },
  { username: "Eleanor", role: "Engineer" as const },
  { username: "Fred", role: "Engineer" as const },
];

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB for user seeding");

  const usernames = users.map((user) => user.username);
  await User.deleteMany({ username: { $in: usernames } });

  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  const createdUsers = await Promise.all(
    users.map((user) => User.create({ username: user.username, passwordHash, role: user.role }))
  );

  console.log(`Inserted ${createdUsers.length} users.`);
  createdUsers.forEach((user) => console.log(`- ${user.username} (${user.role})`));

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
