export interface CalendarEvent {
  _id: string;
  date: string;
  time: string;
  duration: number;
  title: string;
  agenda?: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEventFormData {
  date: string;
  time: string;
  duration: number | "";
  title: string;
  agenda: string;
  owner: string;
}
