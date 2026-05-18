import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import eventsRouter from "./routes/events.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wbs-events";

app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
