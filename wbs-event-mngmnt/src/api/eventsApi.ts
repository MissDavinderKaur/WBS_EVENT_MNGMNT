import type { CalendarEvent, CalendarEventFormData } from "../types/event";

const BASE = "/api/events";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// GET all events
export async function fetchEvents(): Promise<CalendarEvent[]> {
  return handleResponse(await fetch(BASE));
}

// GET single event
export async function fetchEvent(id: string): Promise<CalendarEvent> {
  return handleResponse(await fetch(`${BASE}/${id}`));
}

// POST event
export async function createEvent(data: CalendarEventFormData): Promise<CalendarEvent> {
  return handleResponse(
    await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

// PUT updated single event
export async function updateEvent(id: string, data: CalendarEventFormData): Promise<CalendarEvent> {
  return handleResponse(
    await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

// DELETE single event
export async function deleteEvent(id: string): Promise<void> {
  return handleResponse(await fetch(`${BASE}/${id}`, { method: "DELETE" }));
}
