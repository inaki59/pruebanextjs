'use client';

import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [newChatTitle, setNewChatTitle] = useState("");

  if (!user) {
    router.push("/Login");
    return null;
  }

  const handleCreateChat = () => {
    // Lógica para crear nuevo chat
    console.log("Creando chat:", newChatTitle);
    // Aquí iría la llamada a tu API o función para crear el chat
    // Luego redirigir al nuevo chat o actualizar la lista
  };

  return (
    <div className="flex flex-col h-full">
      {/* Encabezado */}
      <h1 className="text-2xl font-bold mb-6">Tus chats</h1>

      {/* Lista de chats con scroll */}
      <div className="flex-1 overflow-y-auto">
        {user.chats && user.chats.length > 0 ? (
          <ul className="space-y-3">
            {user.chats.map((chat) => (
              <li
                key={chat.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => router.push(`/chats/${chat.id}`)}
              >
                <h2 className="font-medium text-lg">{chat.title}</h2>
                <p className="text-sm text-gray-500 truncate">
                  {chat.messages[0]?.content || "Nuevo chat"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No hay chats disponibles</p>
          </div>
        )}
      </div>

      {/* Input para nuevo chat - Fijo en la parte inferior */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            placeholder="Nombre del nuevo chat"
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
            onKeyDown={(e) => e.key === 'Enter' && handleCreateChat()}
          />
          <button
            onClick={handleCreateChat}
            disabled={!newChatTitle.trim()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}