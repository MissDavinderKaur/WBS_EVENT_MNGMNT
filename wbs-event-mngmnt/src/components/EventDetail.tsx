import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchEvent, deleteEvent } from "../api/eventsApi";
import type { CalendarEvent } from "../types/event";

export default function EventDetail() {
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

  async function handleDelete() {
    if (!event || !confirm(`Delete "${event.title}"?`)) return;
    await deleteEvent(event._id);
    navigate("/");
  }

  if (loading) return <p className="text-center text-gray-400 py-16">Loading…</p>;
  if (error) return <p className="text-center text-red-500 py-16">{error}</p>;
  if (!event) return null;

  return (
    <div className="max-w-xl">
      <Link to="/" className="text-sm text-blue-600 hover:underline">&larr; Back to events</Link>

      <div className="mt-4 bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <Row label="Date" value={event.date} />
          <Row label="Time" value={event.time} />
          <Row label="Duration" value={`${event.duration} minutes`} />
          <Row label="Owner" value={event.owner} />
        </dl>

        {event.agenda && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Agenda</p>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{event.agenda}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <Link
          to={`/events/${event._id}/edit`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="font-medium text-gray-500">{label}</dt>
      <dd className="text-gray-900">{value}</dd>
    </>
  );
}
