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
  pharmacyName: string;
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
  return apiRequest<User>("/auth/signup/pharmacy-staff", { method: "POST", body: payload });
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
