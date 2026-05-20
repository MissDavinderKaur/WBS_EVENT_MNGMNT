import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UserName = "Ada" | "Bob" | "Carla" | "Dave" | "Eleanor" | "Fred";
export type OwnerRole = "Engineer" | "Product Owner" | "Engineering Manager";

export interface AuthUser {
  name: UserName;
  role: OwnerRole;
  token: string;
  isLoggedIn: true;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "wbs-event-mngmnt-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (parsed?.name && parsed?.role && parsed?.token && parsed?.isLoggedIn === true) {
        setUser(parsed as AuthUser);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = (authUser: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
