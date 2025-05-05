// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import  mockUsers  from "../../../public/mockUsers.json"; // importa el mock

type User = { email: string; chats?: any[] } | null;

interface AuthContextType {
  user: User;
  login: (user: { email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  const login = (user: { email: string }) => {
    // Buscar usuario en mock
    const foundUser = mockUsers.find((u) => u.email === user.email);
    if (foundUser) {
      setUser(foundUser); // aquí sí tienes los chats
      const firstChatId = foundUser.chats?.[0]?.id || "defaultChat";
      router.push(`/Chats/${firstChatId}`);
    } else {
      // Si no está en el mock, puedes manejarlo como quieras (error, login básico, etc.)
      setUser({ email: user.email });
      router.push(`/Chats/defaultChat`);
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
