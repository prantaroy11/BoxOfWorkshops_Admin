'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import ActionMenu from '@/components/ui/ActionMenu';

const WORKSHOPS = [
  { 
    id: 1, 
    title: 'Mindfulness & Meditation Basics', 
    subtitle: 'Effective ways to manage daily', 
    imageColor: 'from-orange-400 to-red-400',
    category: 'Mindfulness', catBg: 'bg-[#e3f9f0]', catText: 'text-[#1fa46b]',
    instructor: 'Sarah Parker', 
    duration: '2h 30m', 
    regCurrent: 32, regMax: 50, 
    price: '$40.00', 
    status: 'Upcoming', statusBg: 'bg-[#e7f5ff]', statusText: 'text-[#339af0]' 
  },
  { 
    id: 2, 
    title: 'Stress Management Workshop', 
    subtitle: 'Practical techniques for modern', 
    imageColor: 'from-blue-400 to-indigo-400',
    category: 'Mindfulness', catBg: 'bg-[#e3f9f0]', catText: 'text-[#1fa46b]',
    instructor: 'James Lee', 
    duration: '2h', 
    regCurrent: 48, regMax: 48, 
    price: '$35.00', 
    status: 'Full', statusBg: 'bg-[#fccae2]', statusText: 'text-[#e64980]' 
  },
  { 
    id: 3, 
    title: 'Yoga for Beginners', 
    subtitle: 'Discover the power of natural', 
    imageColor: 'from-green-400 to-emerald-400',
    category: 'Yoga', catBg: 'bg-[#ebfbee]', catText: 'text-[#40c057]',
    instructor: 'Emma Wilson', 
    duration: '1h 30m', 
    regCurrent: 18, regMax: 30, 
    price: '$45.00', 
    status: 'Upcoming', statusBg: 'bg-[#e7f5ff]', statusText: 'text-[#339af0]' 
  },
  { 
    id: 4, 
    title: 'Sound Healing Therapy', 
    subtitle: 'Experience the magic of sound', 
    imageColor: 'from-purple-400 to-fuchsia-400',
    category: 'Meditation', catBg: 'bg-[#f3f0ff]', catText: 'text-[#845ef7]',
    instructor: 'Chris Olive', 
    duration: '2h 45m', 
    regCurrent: 'in slots', regMax: null, 
    price: '$55.00', 
    status: 'Ongoing', statusBg: 'bg-[#fff4e6]', statusText: 'text-[#fd7e14]' 
  },
  { 
    id: 5, 
    title: 'Inner Peace & Balance', 
    subtitle: 'Achieve harmony through these', 
    imageColor: 'from-teal-400 to-cyan-400',
    category: 'Mindfulness', catBg: 'bg-[#e3f9f0]', catText: 'text-[#1fa46b]',
    instructor: 'David Smith', 
    duration: '2h', 
    regCurrent: 25, regMax: 11, 
    price: '$40.00', 
    status: 'Ongoing', statusBg: 'bg-[#fff4e6]', statusText: 'text-[#fd7e14]' 
  },
  { 
    id: 6, 
    title: 'Aromatherapy Essentials', 
    subtitle: 'Harness the power of essential', 
    imageColor: 'from-yellow-400 to-orange-400',
    category: 'Nutrition', catBg: 'bg-[#fff4e6]', catText: 'text-[#fd7e14]',
    instructor: 'Sophia Martinez', 
    duration: '1h 45m', 
    regCurrent: 22, regMax: 30, 
    price: '$38.00', 
    status: 'Upcoming', statusBg: 'bg-[#e7f5ff]', statusText: 'text-[#339af0]' 
  },
];

const TABS = [
  { label: 'All', count: '(138)' },
  { label: 'Upcoming', count: '(42)' },
  { label: 'Ongoing', count: '(20)' },
  { label: 'Completed', count: '(315)' },
  { label: 'Cancelled', count: '(8)' },
];

export default function WorkshopsView() {
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
                className={`mr-[24px] pb-[12px] px-[8px] whitespace-nowrap text-[14px] font-medium transition-colors border-b-2 -mb-[2px] ${
                  isActive ? 'text-[#8b5cf6] border-[#8b5cf6]' : 'text-slate-500 border-transparent hover:text-slate-800'
                }`}
              >
                {tab.label} <span className={`ml-1 text-[13px] ${isActive ? 'text-[#8b5cf6]' : 'text-slate-400'}`}>{tab.count}</span>
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
              placeholder="Search workshops..."
              className="w-full pl-9 pr-4 py-[6px] border border-[#ced4da] rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-[6px] border border-[#ced4da] bg-white hover:bg-slate-50 transition-colors rounded-md text-[13px] font-medium text-slate-700 whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" /> Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[14px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#f1f3f5] text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-4 pr-4 font-semibold">Workshop</th>
              <th className="py-4 px-4 font-semibold">Categories</th>
              <th className="py-4 px-4 font-semibold">Instructor</th>
              <th className="py-4 px-4 font-semibold">Duration</th>
              <th className="py-4 px-4 font-semibold">Registration</th>
              <th className="py-4 px-4 font-semibold">Price</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {WORKSHOPS.map((workshop) => (
              <tr key={workshop.id} className="border-b border-[#e9ecef] hover:bg-slate-50 transition-colors">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-[48px] h-[48px] rounded-md bg-gradient-to-br ${workshop.imageColor} shrink-0`}></div>
                    <div>
                      <div className="font-semibold text-slate-800">{workshop.title}</div>
                      <div className="text-[13px] text-[#adb5bd]">{workshop.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-[8px] py-[2px] rounded-[4px] text-[12px] font-medium ${workshop.catBg} ${workshop.catText}`}>
                    {workshop.category}
                  </span>
                </td>
                <td className="py-4 px-4 font-medium text-slate-700">{workshop.instructor}</td>
                <td className="py-4 px-4 font-medium text-slate-700">{workshop.duration}</td>
                <td className="py-4 px-4">
                  {typeof workshop.regCurrent === 'number' && workshop.regMax !== null ? (
                    <div className="flex flex-col gap-1 w-[80px]">
                      <span className="text-[13px] font-medium text-slate-700">{workshop.regCurrent} / {workshop.regMax}</span>
                      <div className="w-full bg-[#ececec] h-[6px] rounded-full overflow-hidden">
                        <div 
                          className="bg-[#8b5cf6] h-full rounded-full" 
                          style={{ width: `${Math.min(100, (workshop.regCurrent / workshop.regMax) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 w-[80px]">
                      <span className="text-[13px] font-medium text-slate-700">{workshop.regCurrent}</span>
                      <div className="w-full bg-[#ececec] h-[6px] rounded-full overflow-hidden">
                        <div className="bg-[#ececec] h-full rounded-full w-0"></div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 font-medium text-slate-700">{workshop.price}</td>
                <td className="py-4 px-4">
                  <span className={`px-[10px] py-[4px] rounded-full text-[12px] font-semibold ${workshop.statusBg} ${workshop.statusText}`}>
                    {workshop.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <ActionMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-[24px] text-[13px] text-slate-500 gap-4">
        <div>Showing 1 to 6 of 138 results</div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e9ecef] hover:bg-slate-50 transition-colors text-slate-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#8b5cf6] text-white font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e9ecef] hover:bg-slate-50 transition-colors font-medium">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e9ecef] hover:bg-slate-50 transition-colors font-medium">
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e9ecef] hover:bg-slate-50 transition-colors font-medium">
            23
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e9ecef] hover:bg-slate-50 transition-colors text-slate-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
