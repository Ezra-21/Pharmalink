import { apiRequest } from "@/lib/api/client";
import type { User, UserRole } from "@/lib/types/user";

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
 * Toggle this once the Go auth endpoints are live — same pattern as
 * lib/api/medicines.ts's USE_MOCKS. Until then, this lets Login/Signup
 * work end-to-end locally (and sets a real `pharmalink_session` cookie, so
 * proxy.ts's route guard on /home actually passes) with no backend running.
 */
const USE_MOCKS = true;

const SESSION_COOKIE = "pharmalink_session";
const ROLE_COOKIE = "pharmalink_role";
const MOCK_USER_STORAGE_KEY = "pharmalink_mock_user";

function setMockSession(user: User) {
  // Plain, non-HttpOnly cookies — fine for a local mock; the real backend
  // will set an HttpOnly session cookie server-side instead. `proxy.ts`
  // only checks for presence/role, which this satisfies identically.
  document.cookie = `${SESSION_COOKIE}=mock-session; path=/; max-age=${60 * 60 * 24}`;
  document.cookie = `${ROLE_COOKIE}=${user.role}; path=/; max-age=${60 * 60 * 24}`;
  window.localStorage.setItem(MOCK_USER_STORAGE_KEY, JSON.stringify(user));
}

function clearMockSession() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${ROLE_COOKIE}=; path=/; max-age=0`;
  window.localStorage.removeItem(MOCK_USER_STORAGE_KEY);
}

function readMockUser(): User | null {
  try {
    const raw = window.localStorage.getItem(MOCK_USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function buildMockUser(role: UserRole, fields: Partial<User>): User {
  return {
    id: `mock-${role}-1`,
    name: fields.name || "Test User",
    phone: fields.phone ?? "0911000000",
    email: fields.email ?? "",
    role,
    preferredLanguage: fields.preferredLanguage ?? "en",
  };
}

/**
 * NOTE: The Go backend contract for these endpoints is not finalized yet.
 * Paths/payloads below are best-guess placeholders and will need to be
 * confirmed against the real API before wiring this up for real.
 */
export async function login(payload: LoginPayload): Promise<User> {
  if (USE_MOCKS) {
    // No real credential check in mock mode — any email/password "logs in"
    // as a patient, matching Login's own copy ("welcome back").
    const user = buildMockUser("patient", { email: payload.email, name: payload.email.split("@")[0] });
    setMockSession(user);
    return user;
  }
  return apiRequest<User>("/auth/login", { method: "POST", body: payload });
}

export async function signupPatient(payload: SignupPatientPayload): Promise<User> {
  if (USE_MOCKS) {
    const user = buildMockUser("patient", payload);
    setMockSession(user);
    return user;
  }
  return apiRequest<User>("/auth/signup/patient", { method: "POST", body: payload });
}

export async function signupPharmacyStaff(payload: SignupPharmacyStaffPayload): Promise<User> {
  if (USE_MOCKS) {
    // Files aren't persisted anywhere in mock mode — there's nowhere for
    // them to go without a backend; only the account fields are mocked.
    const user = buildMockUser("pharmacy_staff", payload);
    setMockSession(user);
    return user;
  }

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
  if (USE_MOCKS) return;
  return apiRequest<void>("/auth/forgot-password", { method: "POST", body: { identifier } });
}

export async function getCurrentUser(): Promise<User | null> {
  if (USE_MOCKS) {
    return readMockUser();
  }
  try {
    return await apiRequest<User>("/auth/me");
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  if (USE_MOCKS) {
    clearMockSession();
    return;
  }
  return apiRequest<void>("/auth/logout", { method: "POST" });
}
