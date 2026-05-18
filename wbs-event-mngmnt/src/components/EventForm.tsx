import { useState, useEffect } from "react";
import { z } from "zod";
import type { CalendarEvent, CalendarEventFormData } from "../types/event";

const EventSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.number({ error: "Duration is required" }).positive("Must be positive"),
  title: z.string().min(1, "Title is required").max(200),
  agenda: z.string().optional(),
  owner: z.string().min(1, "Owner is required").max(100),
  role: z.enum(["Engineer", "Product Owner", "Engineering Manager"]),
});

type ValidationErrors = Partial<Record<keyof CalendarEventFormData, string>>;

interface Props {
  initial?: CalendarEvent;
  onSubmit: (data: CalendarEventFormData) => Promise<void>;
  submitLabel: string;
}

const EMPTY: CalendarEventFormData = {
  date: "",
  time: "",
  duration: 15,
  title: "",
  agenda: "",
  owner: "",
  role: "Engineer",
};

export default function EventForm({ initial, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<CalendarEventFormData>(EMPTY);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (initial) {
      setForm({
        date: initial.date,
        time: initial.time,
        duration: initial.duration,
        title: initial.title,
        agenda: initial.agenda ?? "",
        owner: initial.owner,
        role: initial.role,
      });
    }
  }, [initial]);

  function set<K extends keyof CalendarEventFormData>(key: K, value: CalendarEventFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const parsed = EventSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: ValidationErrors = {};
      for (const [field, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
        fieldErrors[field as keyof CalendarEventFormData] = (msgs as string[])[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(parsed.data as CalendarEventFormData);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {serverError && (
        <p className="bg-red-50 border border-red-300 text-red-700 rounded px-4 py-2 text-sm">{serverError}</p>
      )}

      <Field label="Title *" error={errors.title}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className={input(errors.title)}
          placeholder="Team standup"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Date *" error={errors.date}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={input(errors.date)}
          />
        </Field>
        <Field label="Time *" error={errors.time}>
          <input
            type="time"
            value={form.time}
            onChange={(e) => set("time", e.target.value)}
            className={input(errors.time)}
          />
        </Field>
      </div>

      <Field label="Duration (minutes) *" error={errors.duration}>
        <input
          type="number"
          min={1}
          value={form.duration}
          onChange={(e) => set("duration", e.target.value as unknown as number)}
          className={input(errors.duration)}
          placeholder="60"
        />
      </Field>

      <Field label="Owner *" error={errors.owner}>
        <input
          type="text"
          value={form.owner}
          onChange={(e) => set("owner", e.target.value)}
          className={input(errors.owner)}
          placeholder="Jane Smith"
        />
      </Field>

      <Field label="Agenda" error={errors.agenda}>
        <textarea
          value={form.agenda}
          onChange={(e) => set("agenda", e.target.value)}
          className={`${input()} resize-none`}
          rows={4}
          placeholder="Optional agenda details..."
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-purple-700 hover:bg-purple-800 disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
      >
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function input(error?: string) {
  return `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    error ? "border-red-400" : "border-gray-300"
  }`;
}
