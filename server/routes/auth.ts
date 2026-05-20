import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { RegisterSchema, LoginSchema } from "../schemas/userSchema.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

router.post("/register", async (req, res) => {
  const result = RegisterSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });

  const { username, password, role } = result.data;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash, role });
  res.status(201).json({ id: user._id, username: user.username, role: user.role });
});

router.post("/login", async (req, res) => {
  const result = LoginSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });

  const { username, password } = result.data;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, username: user.username, role: user.role });
});

export default router;
