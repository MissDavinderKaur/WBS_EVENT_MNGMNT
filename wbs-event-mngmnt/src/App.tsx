import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";
import EditEvent from "./components/EditEvent";
import LogIn from "./components/LogIn";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-purple-200 border-b border-purple-300 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold text-purple-900">"Sprint Savants" Team</span>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")}
          className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Log In
          </button>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
      <BrowserRouter>
        <div className="min-h-screen bg-purple-50">
          <Header />
          <main className="max-w-3xl mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/events/new" element={<CreateEvent />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/events/:id/edit" element={<EditEvent />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
  );
}
