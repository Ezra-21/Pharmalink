import { apiRequest } from "@/lib/api/client";
import type { User } from "@/lib/types/user";

export interface LoginPayload {
  email: string; // email only — Login does not accept phone number, per Page 1 PRD
  password: string;
}

export interface SignupPatientPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  preferredLanguage: "en" | "am";
}

export interface SignupPharmacyStaffPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  preferredLanguage: "en" | "am";
  pharmacyName: string;
  address: string;
  pharmacyPhone: string;
  /** Matches the Figma field exactly (a license/registration number the
   * pharmacy already has) — not a Pharmacy.id (those are backend-generated).
   * Needs a real backend field to land in; not present in main prd.md §8 today. */
  pharmacyId: string;
  /** License/permit document(s) — see the data-model gap flagged in
   * `Page 4 — Pharmacy Staff Registration/pharmacy-staff-registration.md`:
   * §8's Pharmacy entity has no documents field yet, so the exact field
   * name/shape the Go backend expects for these files is unconfirmed. */
  documents: File[];
}

/**
 * NOTE: The Go backend contract for these endpoints is not finalized yet.
 * Paths/payloads below are best-guess placeholders and will need to be
 * confirmed against the real API before wiring this up for real.
 */
export async function login(payload: LoginPayload): Promise<User> {
  return apiRequest<User>("/auth/login", { method: "POST", body: payload });
}

export async function signupPatient(payload: SignupPatientPayload): Promise<User> {
  return apiRequest<User>("/auth/signup/patient", { method: "POST", body: payload });
}

export async function signupPharmacyStaff(payload: SignupPharmacyStaffPayload): Promise<User> {
  // FormData, not JSON, since this submission includes files — apiRequest
  // detects FormData and skips JSON-encoding it.
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("phone", payload.phone);
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("preferredLanguage", payload.preferredLanguage);
  formData.append("pharmacyName", payload.pharmacyName);
  formData.append("address", payload.address);
  formData.append("pharmacyPhone", payload.pharmacyPhone);
  formData.append("pharmacyId", payload.pharmacyId);
  payload.documents.forEach((file) => formData.append("documents", file));

  return apiRequest<User>("/auth/signup/pharmacy-staff", { method: "POST", body: formData });
}

export async function requestPasswordReset(identifier: string): Promise<void> {
  return apiRequest<void>("/auth/forgot-password", { method: "POST", body: { identifier } });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await apiRequest<User>("/auth/me");
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  return apiRequest<void>("/auth/logout", { method: "POST" });
}
