'use client';

import { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState<any>(null);

  useEffect(() => {
    // Espera a que Next.js hidrate los parámetros
    if (!params.id) return;

    if (!user) {
      router.push("/Login");
      return;
    }

    const chat = user.chats?.find((chat: any) => chat.id === params.id);
    
    if (!chat) {
      console.error("Chat no encontrado para el ID:", params.id);
      router.push("/Chats");
      return;
    }

    setCurrentChat(chat);
    setIsLoading(false);
  }, [params.id, user, router]);

  if (!user || isLoading) {
    return <div className="min-h-screen p-6">Cargando...</div>;
  }

  return (
<div className="min-h-[75vh]">
  <h1 className="text-2xl font-black text-black mb-4">{currentChat.title}</h1>

  <div className="space-y-4">
    {currentChat?.messages.map((message: any, index: number) => (
      <div
        key={index}
        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`w-full max-w-md p-3 rounded-lg shadow-sm
          ${message.role === 'user'
            ? 'bg-blue-50 text-gray-900 rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'}
        `}>
          <p className="text-sm">{message.content}</p>

          {message.role === 'bot' && (
            <div className="flex items-center justify-between w-full mt-2 text-gray-500 text-xs">
              {/* Izquierda: Copiar y feedback */}
              <div className="flex items-center space-x-2">
                <span className="cursor-pointer hover:text-gray-700">📋</span>
                <span className="cursor-pointer hover:text-gray-700">👍</span>
                <span className="cursor-pointer hover:text-gray-700">👎</span>
              </div>

              {/* Derecha: Regenerar */}
              <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                <span>🔄</span>
                <span>Regenerate</span>
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
}