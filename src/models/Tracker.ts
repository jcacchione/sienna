export interface Reminder {
  id: string;
  time: Date;
  enabled: boolean;
}

export interface Tracker {
  id: string;
  title: string;
  description?: string;
  frequency: string; // e.g., "daily", "weekly", "monthly", "custom"
  customFrequency?: number; // days between occurrences if custom
  lastCompleted?: Date;
  nextDue: Date;
  reminders: Reminder[];
  createdAt: Date;
  updatedAt: Date;
}
