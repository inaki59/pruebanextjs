// app/chats/layout.js (El que propusimos antes)
import Sidebar from '../components/Sidebar';
import { ReactNode } from 'react';
interface Props {
    children: ReactNode; // Acepta cualquier elemento React válido
  }
export default function ChatsLayout({ children }:Props) {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-100 h-screen">
  {/* Barra Lateral, solo para rutas dentro de /chats */}
  <aside className="w-64 bg-white dark:bg-gray-800 shadow-md overflow-y-auto flex-shrink-0 h-full">
    <Sidebar />
  </aside>

  {/* Área de contenido principal, solo para rutas dentro de /chats */}
  {/* Aquí se renderizará app/chats/page.js o app/chats/[id]/page.js */}
  <main className="flex-1 overflow-y-auto p-6 h-full">
    {children} 
  </main>
</div>

  );
}