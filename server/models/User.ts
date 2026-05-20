import mongoose, { Schema } from "mongoose";

export type OwnerRole = "Engineer" | "Product Owner" | "Engineering Manager";

export interface UserDoc {
  username: string;
  passwordHash: string;
  role: OwnerRole;
}

const userSchema = new Schema<UserDoc>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["Engineer", "Product Owner", "Engineering Manager"], required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDoc>("User", userSchema);
