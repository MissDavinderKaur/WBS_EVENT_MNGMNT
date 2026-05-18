import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { createEvent } from "../api/eventsApi";
import type { CalendarEventFormData } from "../types/event";

export default function CreateEvent() {
  const navigate = useNavigate();

  async function handleSubmit(data: CalendarEventFormData) {
    const created = await createEvent(data);
    navigate(`/events/${created._id}`);
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Event</h1>
      <EventForm onSubmit={handleSubmit} submitLabel="Create Event" />
    </div>
  );
}
