"use client";

import { useLogin } from "./useLogin";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    error,
    success,
  } = useLogin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-metallic text-white">
      <h1 className="text-2xl font-bold text-accentBlue">Iniciar Sesión</h1>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white text-black border border-gray-300 px-4 py-2 rounded w-64 focus:outline-accentBlue"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white text-black border border-gray-300 px-4 py-2 rounded w-64 focus:outline-accentBlue"
      />

      <button
        onClick={handleLogin}
        className="bg-accentBlue text-white px-4 py-2 rounded hover:bg-blue-700 duration-100"
      >
        Entrar
      </button>

      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-mint">Login correcto ✅</p>}
    </div>
  );
}
