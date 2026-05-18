import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents, deleteEvent } from "../api/eventsApi";
import type { CalendarEvent } from "../types/event";

export default function EventList() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e._id !== id));
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMsg message={error} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendar Events</h1>
        <Link
          to="/events/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No events yet. Create one!</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <Link to={`/events/${event._id}`} className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{event.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {event.date} at {event.time} &middot; {event.duration} min &middot; {event.owner}
                </p>
              </Link>
              <div className="flex gap-2 ml-4 shrink-0">
                <Link
                  to={`/events/${event._id}/edit`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id, event.title)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Spinner() {
  return <p className="text-center text-gray-400 py-16">Loading…</p>;
}

function ErrorMsg({ message }: { message: string }) {
  return <p className="text-center text-red-500 py-16">{message}</p>;
}
