import { apiRequest } from "@/lib/api/client";

export type ReminderCadence = "one_time" | "interval";
export type ReminderChannel = "push" | "sms";

export interface Reminder {
  id: string;
  userId: string;
  medicineId: string;
  cadenceType: ReminderCadence;
  nextDueAt: string;
  channel: ReminderChannel;
  status: "active" | "snoozed" | "cancelled";
}

export interface CreateReminderPayload {
  medicineId: string;
  cadenceType: ReminderCadence;
  nextDueAt: string;
  channel: ReminderChannel;
}

const USE_MOCKS = true;

export async function createReminder(payload: CreateReminderPayload): Promise<Reminder> {
  if (USE_MOCKS) {
    return {
      id: `reminder_${Date.now()}`,
      userId: "mock_user",
      status: "active",
      ...payload,
    };
  }
  return apiRequest<Reminder>("/reminders", { method: "POST", body: payload });
}

export async function listReminders(): Promise<Reminder[]> {
  if (USE_MOCKS) return [];
  return apiRequest<Reminder[]>("/reminders");
}
