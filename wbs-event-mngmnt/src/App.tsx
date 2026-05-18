import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";
import EditEvent from "./components/EditEvent";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-purple-50">
        <header className="bg-purple-200 border-b border-purple-300 px-6 py-4">
          <span className="text-lg font-semibold text-purple-900">"Sprint Savants" Team</span>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/events/new" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
