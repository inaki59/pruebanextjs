"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
export function useLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  interface User {
    email: string;
    password: string;
  }
  const { login } = useAuth();
  const handleLogin = async () => {
    const res = await fetch("/mockUsers.json");
    const users = await res.json();
  
    const userFound = users.find(
      (user: User) => user.email === email && user.password === password
    );
  
    if (userFound) {
      login({ email: userFound.email });
      setSuccess(true);
      
      setError("");
    } else {
      setError("Credenciales incorrectas");
      setSuccess(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    handleLogin,
  };
}
