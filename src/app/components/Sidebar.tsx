'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// TypeScript Interfaces
interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface User {
  email: string;
  password?: string;
  chats?: Chat[];
}

export default function Sidebar() {
  // Authentication and State
  const { user } = useAuth() as { user: User | null };
  const [chats, setChats] = useState<Chat[]>(user?.chats || []);
  const pathname = usePathname();

  // Update chats when user data changes
  useEffect(() => {
    if (user?.chats) {
      setChats(user.chats);
    } else {
      setChats([]);
    }
  }, [user?.chats]);

  // Helper function to check active chat
  const isChatActive = (chatId: string) => {
    return pathname === `/chats/${chatId}`;
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      {/* Header Section */}
      <div className="p-4">
        <div className="text-xl font-bold text-gray-900 mb-6">CHAT A.I.+</div>
        
        <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-2xl mb-6 hover:bg-purple-400 transition-colors duration-75">
          + New chat
        </button>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search conversations"
            className="w-full p-2 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-purple-300 focus:border-purple-300"
          />
        </div>
      </div>

      {/* Chat List Section */}
      <div className="flex-1 overflow-y-auto px-4">
        <h3 className="text-gray-500 text-sm font-semibold uppercase mb-2">Your conversations</h3>
        
        {chats.length > 0 ? (
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li key={chat.id}>
                <Link href={`/chats/${chat.id}`} passHref>
                  <div className={`p-3 rounded-md cursor-pointer transition-colors
                    ${isChatActive(chat.id)
                      ? 'bg-purple-100 text-gray-900 font-semibold'
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <p className="text-sm truncate">{chat.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No hay chats disponibles.</p>
        )}
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 mt-4">
        <div className="flex items-center text-sm text-gray-600 py-2 cursor-pointer hover:text-gray-900 transition-colors">
          <div className="w-4 h-4 bg-gray-400 mr-2 rounded-sm"></div>
          <span>Feedback</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 py-2 cursor-pointer hover:text-gray-900 transition-colors">
          <div className="w-4 h-4 bg-gray-400 mr-2 rounded-sm"></div>
          <span>Settings</span>
        </div>

        {/* User Profile */}
        <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
          <div className="w-8 h-8 bg-purple-300 rounded-full mr-3 flex items-center justify-center text-gray-900 font-bold">
            {user?.email ? user.email.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{user?.email || 'Usuario'}</span>
            <span className="text-xs text-gray-500">Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}