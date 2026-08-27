"use client";

import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/lib/types/user";
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from "@/lib/api/auth";
import type { LoginPayload } from "@/lib/api/auth";

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
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

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
