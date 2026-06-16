'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ActionMenu from '@/components/ui/ActionMenu';
import SortMenu from '@/components/ui/SortMenu';

const PRACTITIONERS = [
  { id: 1, name: 'Samantha Nguyen', email: 'samantha.nguyen@email.com', avatar: 'SN', bg: 'bg-[#e3f1ff]', text: 'text-blue-600', workshops: 15, rating: 4.8, revenue: '$5,100', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '12 Apr 2025' },
  { id: 2, name: 'Cody Fisher', email: 'cody.fisher@email.com', avatar: 'CF', bg: 'bg-[#ddf0e7]', text: 'text-emerald-600', workshops: 4, rating: 4.6, revenue: '$3,120', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '16 Apr 2025' },
  { id: 3, name: 'Marvin McKinney', email: 'marvin.mckinney@email.com', avatar: 'MM', bg: 'bg-[#e6f7ff]', text: 'text-sky-600', workshops: 16, rating: 4.9, revenue: '$6,400', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '23 Apr 2025' },
  { id: 4, name: 'Kristin Watson', email: 'kristin.watson@email.com', avatar: 'KW', bg: 'bg-[#fef1e0]', text: 'text-orange-600', workshops: 6, rating: 4.5, revenue: '$2,100', status: 'Pending', statusClass: 'text-[#ffb400]', joined: '28 Apr 2025' },
  { id: 5, name: 'Ralph Edwards', email: 'ralph.edwards@email.com', avatar: 'RE', bg: 'bg-[#fde8e8]', text: 'text-red-600', workshops: 6, rating: 4.7, revenue: '$3,690', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '28 Jun 2025' },
  { id: 6, name: 'Jenny Wilson', email: 'jenny.wilson@email.com', avatar: 'JW', bg: 'bg-[#f3e9fa]', text: 'text-purple-600', workshops: 2, rating: 2.9, revenue: '$1,250', status: 'Banned', statusClass: 'text-[#ff5252]', joined: '17 May 2025' },
];

const TABS = [
  { label: 'All', count: '1,246' },
  { label: 'Pending', count: '50' },
  { label: 'Approved', count: '7,534' },
  { label: 'Banned', count: '14' },
  { label: 'Reported', count: '27' },
];

export default function PractitionersView() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.1)] p-[24px]">

      {/* Tabs & Toolbar Row */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end border-b-2 border-[#f1f3f5] mb-[24px] gap-4 xl:gap-0">

        {/* Tabs */}
        <div className="flex flex-wrap w-full xl:w-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`mr-[24px] pb-[12px] px-[8px] whitespace-nowrap text-[14px] font-medium transition-colors border-b-2 -mb-[2px] ${isActive ? 'text-[#4c6ef5] border-[#4c6ef5]' : 'text-slate-500 border-transparent hover:text-slate-800'
                  }`}
              >
                {tab.label} <span className={`ml-1 text-[13px] ${isActive ? 'text-[#4c6ef5]' : 'text-slate-400'}`}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 pb-[12px] w-full xl:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search practitioners"
              className="w-full pl-9 pr-4 py-[6px] border border-[#ced4da] rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-[#4c6ef5] focus:border-transparent"
            />
          </div>
          <SortMenu />
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#e9ecef] text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-4 pr-4 font-semibold">Practitioner</th>
              <th className="py-4 px-4 font-semibold">Workshops</th>
              <th className="py-4 px-4 font-semibold">Rating</th>
              <th className="py-4 px-4 font-semibold">Revenue</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 font-semibold">Joined On</th>
              <th className="py-4 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {PRACTITIONERS.map((practitioner) => (
              <tr key={practitioner.id} className="border-b border-[#e9ecef] hover:bg-slate-50 transition-colors">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${practitioner.bg} ${practitioner.text}`}>
                      {practitioner.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{practitioner.name}</div>
                      <div className="text-[13px] text-[#adb5bd]">{practitioner.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-slate-700">{practitioner.workshops}</td>
                <td className="py-4 px-4 font-medium text-slate-700">
                  <span className="text-amber-400 mr-1">★</span>{practitioner.rating}
                </td>
                <td className="py-4 px-4 font-medium text-slate-700">{practitioner.revenue}</td>
                <td className="py-4 px-4">
                  <span className={`font-medium ${practitioner.statusClass}`}>{practitioner.status}</span>
                </td>
                <td className="py-4 px-4 text-slate-500">{practitioner.joined}</td>
                <td className="py-4 px-4 text-center">
                  <ActionMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-[24px] gap-4">
        <div className="text-[13px] text-slate-500">
          Showing 1 to 6 of 1,246 results
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 border border-[#e9ecef] rounded text-slate-400 hover:bg-slate-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#4c6ef5] text-white text-[13px] font-medium">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#e9ecef] text-slate-600 hover:bg-slate-50 text-[13px] font-medium">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#e9ecef] text-slate-600 hover:bg-slate-50 text-[13px] font-medium">3</button>
          <span className="text-slate-400 mx-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#e9ecef] text-slate-600 hover:bg-slate-50 text-[13px] font-medium">20</button>
          <button className="p-2 border border-[#e9ecef] rounded text-slate-600 hover:bg-slate-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
