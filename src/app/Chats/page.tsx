'use client';

import { useContext } from "react";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";

export default function ChatsPage() {
    const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/Login");
    return null;
  }

  return (
<div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Tus chats</h1>

      {user.chats && user.chats.length > 0 ? (
        <ul className="space-y-4">
          {user.chats.map((chat) => (
            <li
              key={chat.id}
              className="p-4 rounded border hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => router.push(`/Chats/${chat.id}`)}
            >
              <h2 className="text-lg font-semibold">{chat.title}</h2>
              <p className="text-sm text-gray-500">
                {chat.messages[0]?.content.slice(0, 50)}...
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay chats disponibles. ¡Empieza una conversación!</p>
      )}
    </div>
  );
}
