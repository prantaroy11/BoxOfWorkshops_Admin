'use client';

import React, { useState, useEffect } from 'react';
import { MoreVertical, Eye, Flag, Ban } from 'lucide-react';

export default function ActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-center z-50" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
      >
          <MoreVertical className="w-5 h-5 mx-auto" />
        </button>
        
        {isOpen && (
          <div className="absolute right-8 top-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-[10px] p-[16px] w-[200px] flex flex-col gap-4 text-left">
            <button className="flex items-center gap-3 text-[#1f2937] hover:text-[#4c6ef5] transition-colors w-full text-left">
              <Eye className="w-4 h-4 shrink-0" />
              <span className="text-[14px]">View profile</span>
            </button>
            <button className="flex items-center gap-3 text-[#f97316] hover:text-orange-600 transition-colors w-full text-left">
              <Flag className="w-4 h-4 shrink-0" />
              <span className="text-[14px]">Suspend Account</span>
            </button>
            <button className="flex items-center gap-3 text-[#f97316] hover:text-orange-600 transition-colors w-full text-left">
              <Ban className="w-4 h-4 shrink-0" />
              <span className="text-[14px]">Ban Account</span>
            </button>
          </div>
        )}
      </div>
  );
}
