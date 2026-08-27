export type UserRole = "patient" | "pharmacy_staff" | "admin";

export type PreferredLanguage = "en" | "am";

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  preferredLanguage: PreferredLanguage;
}
