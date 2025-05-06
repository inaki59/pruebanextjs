// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import mockUsers from "../../../public/mockUsers.json"; // importa el mock

type MessageRole = "user" | "bot";

interface Message {
  role: MessageRole;
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface User {
  id?:number,
  email: string;
  password?: string;
  chats: Chat[];
}

interface AuthContextType {
  user: User | any;
  login: (user: { email: string }) => void;
  logout: () => void;
  addNewMessage: (chatId: string, message: Message) => void;
  createNewChat: (title: string) => Chat;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (userData: { email: string }) => {
    const foundUser = mockUsers.find((u: any) => u.email === userData.email);
  
    if (foundUser) {
      // Transformar explícitamente los roles de cada mensaje
      const parsedUser: User = {
        id:foundUser.id,
        email: foundUser.email,
        password: foundUser.password,
        chats: foundUser.chats.map((chat: any) => ({
          id: chat.id,
          title: chat.title,
          messages: chat.messages.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "bot", // aseguramos tipo correcto
            content: msg.content,
          })),
        })),
      };
  
      setUser(parsedUser);
      const firstChatId = parsedUser.chats?.[0]?.id || "defaultChat";
      //
      firstChatId==undefined?router.push(`/chats`):router.push(`/chats/${firstChatId}`);
      
    } else {
      const newUser: User = { email: userData.email, chats: [] };
      setUser(newUser);
      router.push(`/chats`);
    }
  };
  

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  const addNewMessage = (chatId: string, message: Message) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const updatedChats = prevUser.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      );

      return { ...prevUser, chats: updatedChats };
    });
  };

  const createNewChat = (title: string): Chat => {
    if (!user) throw new Error("User not logged in");

    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title,
      messages: [],
    };

    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        chats: [...prevUser.chats, newChat],
      };
    });

    return newChat;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addNewMessage, createNewChat }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
