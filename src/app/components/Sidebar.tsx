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
  const handleClearChats = () => {
    
      // setChats([]);
   
  };
  const handleNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: `Nuevo chat ${chats.length + 1}`,
      messages: [],
    };

  
    setChats([newChat, ...chats]);
  };
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

    <div className="flex flex-row items-center gap-4">
  <button onClick={handleNewChat} className="h-12 w-2/3 bg-purple-600 text-white px-6 rounded-2xl hover:bg-purple-400 transition-colors duration-75 flex items-center">
    + New chat
  </button>
  

  <button className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-purple-400 transition-colors duration-75">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  </button>
</div>


    </div>

      {/* Chat List Section */}
      <div className="flex-1   overflow-y-auto px-4  border-t border-gray-200 mt-4 pt-1">
        <span className="text-gray-500 text-xs font-semibold  mb-2">Your conversations </span>
        <a  className='text-blue-800' onClick={handleClearChats}>Clear All</a>
        <div className='flex-1   overflow-y-auto px-4  border-t border-gray-200 mt-4 pt-1 '></div>
        {chats.length > 0 ? (
          <ul className="space-y-2">
           {chats.map((chat) => (
  <li key={chat.id}>
    <Link href={`/chats/${chat.id}`} passHref>
      <div className={`p-3 rounded-md cursor-pointer transition-colors flex items-center gap-2
        ${isChatActive(chat.id)
          ? 'bg-purple-100 text-gray-900 font-semibold'
          : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-4 h-4"  // Tamaño más pequeño (4 = 1rem)
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" 
          />
        </svg>
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
      <div className="p-4">
   
      <div className="flex items-center  gap-2 text-sm text-gray-600 py-2 px-3 cursor-pointer border border-gray-300 rounded-lg hover:text-gray-900 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>

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