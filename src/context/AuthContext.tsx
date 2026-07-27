import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { INITIAL_USERS, type MockUser } from "@/lib/mockData";

interface AuthContextType {
  currentUser: MockUser | null;
  users: MockUser[];
  login: (phone: string, password: string) => MockUser | null;
  signup: (user: MockUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
  const [users, setUsers] = useState<MockUser[]>([...INITIAL_USERS]);

  const login = useCallback(
    (phone: string, _password: string): MockUser | null => {
      const user = users.find((u) => u.phone === phone && u.password === _password);
      if (user) {
        setCurrentUser(user);
        return user;
      }
      return null;
    },
    [users]
  );

  const signup = useCallback((user: MockUser) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
