'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Menu } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export default function Header() {
  const pathname = usePathname() || '';
  const toggleMobileSidebar = useUIStore((state) => state.toggleMobileSidebar);
  
  const title = 'Dashboard';

  return (
    <header className="mb-[20px] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 bg-white rounded-md shadow-sm text-slate-600 hover:text-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 m-0">{title}</h1>
          <h2 className="text-sm font-normal text-slate-500 m-0 mt-1">
            Welcome back, Super Admin
          </h2>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </header>
  );
}