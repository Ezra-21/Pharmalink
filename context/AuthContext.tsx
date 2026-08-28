"use client";

import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/lib/types/user";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  signupPatient as signupPatientRequest,
  signupPharmacyStaff as signupPharmacyStaffRequest,
} from "@/lib/api/auth";
import type { LoginPayload, SignupPatientPayload, SignupPharmacyStaffPayload } from "@/lib/api/auth";

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  signupPatient: (payload: SignupPatientPayload) => Promise<User>;
  signupPharmacyStaff: (payload: SignupPharmacyStaffPayload) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const current = await getCurrentUser();
    setUser(current);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Fetch-on-mount session check; intentionally fires an async refresh
    // rather than synchronous setState.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const login = useCallback(async (payload: LoginPayload) => {
    const loggedInUser = await loginRequest(payload);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  // Signup logs the user in immediately on success (Page 3 PRD §6: "no
  // separate screen — user is logged in and redirected"), same as login.
  const signupPatient = useCallback(async (payload: SignupPatientPayload) => {
    const newUser = await signupPatientRequest(payload);
    setUser(newUser);
    return newUser;
  }, []);

  // Does NOT redirect anywhere on success (unlike signupPatient) — Page 4's
  // PRD is explicit that this is a "pending review" state shown in place on
  // this same page, not a dashboard redirect (there's no dashboard access
  // until an admin approves the pharmacy).
  const signupPharmacyStaff = useCallback(async (payload: SignupPharmacyStaffPayload) => {
    const newUser = await signupPharmacyStaffRequest(payload);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signupPatient, signupPharmacyStaff, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}
