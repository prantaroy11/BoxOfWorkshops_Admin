'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ActionMenu from '@/components/ui/ActionMenu';
import SortMenu from '@/components/ui/SortMenu';
import PractitionerProfileModal from './PractitionerProfileModal';

const PRACTITIONERS = [
  { id: 1, name: 'Samantha Nguyen', email: 'samantha.nguyen@email.com', avatar: 'SN', bg: 'bg-[#e3f1ff]', text: 'text-blue-600', workshops: 15, rating: 4.8, revenue: '$5,100', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '12 Apr 2025', specialization: 'Yoga Specialization', accountType: 'Individual', experience: '3 Years', submittedOn: '12 Apr 2025' },
  { id: 2, name: 'Cody Fisher', email: 'cody.fisher@email.com', avatar: 'CF', bg: 'bg-[#ddf0e7]', text: 'text-emerald-600', workshops: 4, rating: 4.6, revenue: '$3,120', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '16 Apr 2025', specialization: 'Yoga Specialization', accountType: 'Organization', experience: '5 Years', submittedOn: '16 Apr 2025' },
  { id: 3, name: 'Marvin McKinney', email: 'marvin.mckinney@email.com', avatar: 'MM', bg: 'bg-[#e6f7ff]', text: 'text-sky-600', workshops: 16, rating: 4.9, revenue: '$6,400', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '23 Apr 2025', specialization: 'Yoga Specialization', accountType: 'Organization', experience: '2 Years', submittedOn: '23 Apr 2025' },
  { id: 4, name: 'Kristin Watson', email: 'kristin.watson@email.com', avatar: 'KW', bg: 'bg-[#fef1e0]', text: 'text-orange-600', workshops: 6, rating: 4.5, revenue: '$2,100', status: 'Pending', statusClass: 'text-[#ffb400]', joined: '28 Apr 2025', specialization: 'Yoga Specialization', accountType: 'Individual', experience: '1 Years', submittedOn: '28 Apr 2025' },
  { id: 5, name: 'Ralph Edwards', email: 'ralph.edwards@email.com', avatar: 'RE', bg: 'bg-[#fde8e8]', text: 'text-red-600', workshops: 6, rating: 4.7, revenue: '$3,690', status: 'Approved', statusClass: 'text-[#38d39f]', joined: '28 Jun 2025', specialization: 'Yoga Specialization', accountType: 'Individual', experience: '6 Years', submittedOn: '28 Jun 2025' },
  { id: 6, name: 'Jenny Wilson', email: 'jenny.wilson@email.com', avatar: 'JW', bg: 'bg-[#f3e9fa]', text: 'text-purple-600', workshops: 2, rating: 2.9, revenue: '$1,250', status: 'Banned', statusClass: 'text-[#ff5252]', joined: '17 May 2025', specialization: 'Yoga Specialization', accountType: 'Individual', experience: '8 Years', submittedOn: '17 May 2025' },
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
  const [selectedPractitioner, setSelectedPractitioner] = useState<any>(null);

  return (
    <div className="bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.1)] p-[16px] sm:p-[24px] flex flex-col min-h-[calc(100vh-170px)]">

      {/* Tabs & Toolbar Row */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end border-b-2 border-[#f1f3f5] mb-[24px] gap-4 xl:gap-0">

        {/* Tabs */}
        <div className="flex overflow-x-auto w-full xl:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`mr-[24px] pb-[12px] px-[8px] whitespace-nowrap text-[14px] font-medium transition-colors border-b-2 -mb-[2px] shrink-0 ${isActive ? 'text-[#4c6ef5] border-[#4c6ef5]' : 'text-slate-500 border-transparent hover:text-slate-800'
                  }`}
              >
                {tab.label} <span className={`ml-1 text-[13px] ${isActive ? 'text-[#4c6ef5]' : 'text-slate-400'}`}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pb-[12px] w-full xl:w-auto">
          <div className="relative w-full sm:w-[300px] xl:w-[250px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search practitioners"
              className="w-full pl-9 pr-4 py-[6px] border border-[#ced4da] rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-[#4c6ef5] focus:border-transparent"
            />
          </div>
          <div className="self-start sm:self-auto">
            <SortMenu />
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-auto flex-1 min-h-0">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-[#e9ecef] text-slate-500 font-semibold text-[11px] uppercase tracking-wider shadow-[0_1px_0_0_#e9ecef]">
              <th className="py-4 pr-4 font-semibold">Practitioner</th>
              {activeTab === 'Pending' ? (
                <>
                  <th className="py-4 px-4 font-semibold">Specialization</th>
                  <th className="py-4 px-4 font-semibold text-center">Account Type</th>
                  <th className="py-4 px-4 font-semibold text-center">Experience</th>
                  <th className="py-4 px-4 font-semibold">Submitted On</th>
                </>
              ) : (
                <>
                  <th className="py-4 px-4 font-semibold">Workshops</th>
                  <th className="py-4 px-4 font-semibold">Rating</th>
                  <th className="py-4 px-4 font-semibold">Revenue</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                  <th className="py-4 px-4 font-semibold">Joined On</th>
                </>
              )}
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
                {activeTab === 'Pending' ? (
                  <>
                    <td className="py-4 px-4 font-medium text-slate-500">{practitioner.specialization}</td>
                    <td className="py-4 px-4 font-medium text-slate-500 text-center">{practitioner.accountType}</td>
                    <td className="py-4 px-4 font-medium text-slate-500 text-center">{practitioner.experience}</td>
                    <td className="py-4 px-4 text-slate-500">{practitioner.submittedOn}</td>
                  </>
                ) : (
                  <>
                    <td className="py-4 px-4 font-medium text-slate-700">{practitioner.workshops}</td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      <span className="text-amber-400 mr-1">★</span>{practitioner.rating}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">{practitioner.revenue}</td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${practitioner.statusClass}`}>{practitioner.status}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{practitioner.joined}</td>
                  </>
                )}
                <td className="py-4 px-4 text-center">
                  {activeTab === 'Pending' ? (
                    <button 
                      onClick={() => setSelectedPractitioner(practitioner)}
                      className="text-[#38d39f] hover:text-[#2bb385] text-[13px] font-medium transition-colors"
                    >
                      View Profile
                    </button>
                  ) : (
                    <ActionMenu />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Practitioner Profile Modal */}
      <PractitionerProfileModal 
        isOpen={!!selectedPractitioner} 
        onClose={() => setSelectedPractitioner(null)} 
        practitioner={selectedPractitioner} 
      />

    </div>
  );
}
