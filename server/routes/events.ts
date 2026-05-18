import { Router, Request, Response } from "express";
import { Event } from "../models/Event.js";
import { EventSchema } from "../schemas/eventSchema.js";

const router = Router();

// GET /api/events
router.get("/", async (req: Request, res: Response) => {
  const events = await Event.find().sort({ date: 1, time: 1 });
  res.json(events);
});

// GET /api/events/:id
router.get("/:id", async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.json(event);
});

// POST /api/events
router.post("/", async (req: Request, res: Response) => {
  const result = EventSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }
  const event = await Event.create(result.data);
  res.status(201).json(event);
});

// PUT /api/events/:id
router.put("/:id", async (req: Request, res: Response) => {
  const result = EventSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }
  const event = await Event.findByIdAndUpdate(req.params.id, result.data);
  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.json(event);
});

// DELETE /api/events/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.status(204).send();
});

export default router;
