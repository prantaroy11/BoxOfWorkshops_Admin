'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SortMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div className="relative inline-block" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-[6px] border border-[#ced4da] bg-white hover:bg-slate-50 transition-colors rounded-md text-[13px] font-medium text-slate-700 whitespace-nowrap cursor-pointer z-10 relative"
      >
        Short by <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-10 bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)] rounded-[12px] p-[20px] w-[200px] z-[60] text-left">
          <p className="font-bold text-black mb-[10px] text-[15px]">Short by</p>
          <ul className="m-0 p-0 list-none flex flex-col gap-[16px]">
            <li>
              <button className="text-[rgb(59,65,78)] hover:text-[#4c6ef5] transition-colors text-[14px] w-full text-left">
                Newest
              </button>
            </li>
            <li>
              <button className="text-[rgb(59,65,78)] hover:text-[#4c6ef5] transition-colors text-[14px] w-full text-left">
                Oldest
              </button>
            </li>
            <li>
              <button className="text-[rgb(59,65,78)] hover:text-[#4c6ef5] transition-colors text-[14px] w-full text-left">
                Highest Revenue
              </button>
            </li>
            <li>
              <button className="text-[rgb(59,65,78)] hover:text-[#4c6ef5] transition-colors text-[14px] w-full text-left">
                Highest Rating
              </button>
            </li>
            <li>
              <button className="text-[rgb(59,65,78)] hover:text-[#4c6ef5] transition-colors text-[14px] w-full text-left">
                Most workshop
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
