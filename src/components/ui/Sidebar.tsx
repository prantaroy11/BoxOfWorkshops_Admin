'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  CreditCard, 
  FileText, 
  Mail, 
  PlusSquare, 
  Settings,
  ChevronDown
} from 'lucide-react';

import { useUIStore } from '@/stores/uiStore';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { 
    label: 'Users', 
    href: '/users', 
    icon: Users, 
    subItems: [
      { label: 'Practitioners', href: '/users/practitioners' },
      { label: 'Bookers', href: '/users/bookers' }
    ]
  },
  { 
    label: 'Workshops', 
    href: '/workshops', 
    icon: BookOpen, 
    subItems: [
      { label: 'All Workshops', href: '/workshops/all' },
      { label: 'Pending Approval', href: '/workshops/pending' }
    ]
  },
  { label: 'Bookings', href: '/bookings', icon: CalendarCheck },
  { label: 'Payments', href: '/payments', icon: CreditCard },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'Newsletter', href: '/newsletter', icon: Mail },
  { label: 'Create Ads', href: '/create-ads', icon: PlusSquare },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname() || '';
  const { isMobileSidebarOpen, closeMobileSidebar } = useUIStore();
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({});

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[250px] bg-[#1c224b] text-white flex flex-col justify-between h-screen shrink-0
        transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div>
          <div className="p-[20px] flex items-center gap-3 font-bold text-[18px] tracking-tight">
            <div className="w-10 h-10 bg-[#5e31dc] rounded-lg flex items-center justify-center text-white shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col leading-[1.1]">
              <span className="text-white">Box of</span>
              <span className="text-[#8b5cf6]">Workshop</span>
            </div>
          </div>
          
          <nav className="mt-4">
            <ul className="flex flex-col m-0 p-0 list-none">
              {NAV_ITEMS.map((item) => {
                const isParentActive = pathname.startsWith(item.href);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isExpanded = expandedMenus[item.label] !== undefined ? expandedMenus[item.label] : isParentActive;
                
                return (
                  <li key={item.label} className="w-full">
                    <Link 
                      href={hasSubItems ? '#' : item.href}
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault();
                          setExpandedMenus(prev => ({
                            ...prev,
                            [item.label]: prev[item.label] !== undefined ? !prev[item.label] : !isParentActive
                          }));
                        } else {
                          closeMobileSidebar();
                        }
                      }}
                      className={`flex items-center justify-between px-[20px] py-[15px] cursor-pointer transition-colors duration-200 ${
                        isParentActive && !hasSubItems ? 'bg-[#2d3a8c]' : 'hover:bg-[#2d3a8c]'
                      }`}
                    >
                      <div className={`flex items-center gap-3 text-[15px] ${isParentActive && hasSubItems ? 'text-white' : ''}`}>
                        <item.icon className="w-5 h-5 opacity-90 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {hasSubItems && (
                        <ChevronDown className={`w-4 h-4 opacity-50 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                    
                    {/* Render Submenu if parent is active */}
                    {hasSubItems && isExpanded && (
                      <ul className="bg-[#1c224b] py-2">
                        {item.subItems!.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                onClick={closeMobileSidebar}
                                className={`block pl-[52px] pr-[20px] py-[10px] text-[14px] transition-colors ${
                                  isSubActive ? 'text-[#38d39f] font-medium' : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <footer className="p-[20px] bg-[#394574]">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] bg-[#f6f8fc] rounded-full text-[#1c224b] flex items-center justify-center mr-[10px] font-bold text-sm shrink-0">
              SA
            </div>
            <div className="text-[12px] overflow-hidden">
              <div className="font-semibold truncate">Super Admin</div>
              <div className="opacity-80 truncate">admin@boxofworkshop.com</div>
            </div>
          </div>
        </footer>
      </aside>
    </>
  );
}