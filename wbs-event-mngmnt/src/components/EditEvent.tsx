import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EventForm from "../components/EventForm";
import { fetchEvent, updateEvent } from "../api/eventsApi";
import type { CalendarEvent, CalendarEventFormData } from "../types/event";

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchEvent(id)
      .then(setEvent)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: CalendarEventFormData) {
    await updateEvent(id!, data);
    navigate(`/events/${id}`);
  }

  if (loading) return <p className="text-center text-gray-400 py-16">Loading…</p>;
  if (error) return <p className="text-center text-red-500 py-16">{error}</p>;

  return (
    <div className="max-w-xl">
      <Link to={`/events/${id}`} className="text-sm text-blue-600 hover:underline">&larr; Back to event</Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">Edit Event</h1>
      {event && <EventForm initial={event} onSubmit={handleSubmit} submitLabel="Save Changes" />}
    </div>
  );
}
