'use client';

import { useAuth } from "../../context/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const chatId = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/Login");
      return;
    }

    if (!chatId) return;

    const chat = user.chats?.find((chat: any) => chat.id === chatId);

    if (!chat) {
      console.error("Chat no encontrado para el ID:", chatId);
      router.push("/chats");
      return;
    }

    setCurrentChat(chat);
    setIsLoading(false);
  }, [chatId, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Aquí puedes manejar el envío del mensaje (actualizar estado, enviar a backend, etc.)
    console.log("Mensaje enviado:", inputValue);

    setInputValue("");
  };

  if (!user || isLoading) {
    return <div className="min-h-screen p-6">Cargando...</div>;
  }

  return (
    <div className="min-h-[91vh]  p-6 flex flex-col justify-between items-center">
      <div className="w-full max-w-3xl space-y-4">
        {currentChat.messages.map((message: any, index: number) => (
          <div
            key={index}
            className={`flex  justify-start`}
          >
            <div className={`w-full max-w-2xl p-4 rounded-xl border shadow-sm text-sm leading-relaxed
              ${message.role === 'user'
                ? 'bg-blue-50 text-gray-900 rounded-br-md'
                : 'bg-white text-gray-800 rounded-bl-md border-gray-200'}
            `}>
              <p>{message.content}</p>

              {message.role === 'bot' && (
                <div className="flex items-center justify-between w-full mt-3 text-gray-400 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="cursor-pointer hover:text-gray-600">📋</span>
                    <span className="cursor-pointer hover:text-gray-600">👍</span>
                    <span className="cursor-pointer hover:text-gray-600">👎</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-600">
                    <span>🔄</span>
                    <span>Regenerate</span>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>
      <div className="w- border-t border-gray-300 mt-4"></div>
      {/* Input centrado abajo */}
      <div className="w-full max-w-3xl mt-6">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="🧠 What`s in your mind?..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-black"
          />
       <button
        type="submit"
        className="w-12 h-12 p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
        ➤
      </button>
        </form>
      </div>
    </div>
  );
}
