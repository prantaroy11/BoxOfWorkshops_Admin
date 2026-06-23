'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Eye, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { WorkshopListing, PaginatedResponse } from '@/features/workshops/types';

const TABS = [
  { label: 'All', key: 'all' },
  { label: 'Upcoming', key: 'upcoming' },
  { label: 'Ongoing', key: 'ongoing' },
  { label: 'Completed', key: 'completed' },
  { label: 'Cancelled', key: 'cancelled' },
];

export default function WorkshopsView() {
  const [activeTab, setActiveTab] = useState('All');
  const [workshops, setWorkshops] = useState<WorkshopListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: PaginatedResponse<WorkshopListing> | WorkshopListing[] }>('/admin/listings');
      
      let fetchedWorkshops: WorkshopListing[] = [];
      if (Array.isArray(res.data)) {
        fetchedWorkshops = res.data;
      } else if (res.data && typeof res.data === 'object') {
        fetchedWorkshops = res.data.results || res.data.data || res.data.rows || res.data.docs || [];
      }
      
      setWorkshops(fetchedWorkshops);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch workshops');
    } finally {
      setLoading(false);
    }
  };

  // Simple client-side filtering placeholder
  // Since we might not have all these statuses from the API yet
  const filteredWorkshops = workshops;

  return (
    <div className="bg-white rounded-[8px] shadow-[0_1px_4px_rgba(0,0,0,0.1)] p-[24px]">

      {/* Tabs & Toolbar Row */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end border-b-2 border-[#f1f3f5] mb-[24px] gap-4 xl:gap-0">
        {/* Tabs */}
        <div className="flex flex-wrap w-full xl:w-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.label;
            // Since we only fetched approved ones, we just show total count for 'All' for now
            const count = tab.label === 'All' ? `(${workshops.length})` : '(0)';
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`mr-[24px] pb-[12px] px-[8px] whitespace-nowrap text-[14px] font-medium transition-colors border-b-2 -mb-[2px] ${
                  isActive ? 'text-[#8b5cf6] border-[#8b5cf6]' : 'text-slate-500 border-transparent hover:text-slate-800'
                }`}
              >
                {tab.label} <span className={`ml-1 text-[13px] ${isActive ? 'text-[#8b5cf6]' : 'text-slate-400'}`}>{count}</span>
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
      <div className="overflow-auto max-h-[calc(100vh-250px)]">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-[#8b5cf6]" />
          </div>
        ) : filteredWorkshops.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500">
            <p className="text-[16px] font-medium">No approved workshops found.</p>
          </div>
        ) : (
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
              {filteredWorkshops.map((workshop, index) => {
                const title = workshop.title || 'Untitled Workshop';
                const subtitle = workshop.shortDescription || workshop.description ? String(workshop.shortDescription || workshop.description).substring(0, 30) + '...' : 'No description';
                const instructorName = workshop.practitioner 
                  ? workshop.practitioner.name || workshop.practitioner.contactPerson || 'Unknown Instructor'
                  : 'Unknown Instructor';
                
                let categoryText = workshop.category?.name || workshop.serviceType?.name || 'Uncategorized';
                if (workshop.workshop?.categoryTags && workshop.workshop.categoryTags.length > 0) {
                  categoryText = workshop.workshop.categoryTags.slice(0, 3).join(', ');
                  if (workshop.workshop.categoryTags.length > 3) categoryText += '...';
                } else if (workshop.subcategories && workshop.subcategories.length > 0) {
                  categoryText = workshop.subcategories.slice(0, 3).map((s: any) => s.name).join(', ');
                  if (workshop.subcategories.length > 3) categoryText += '...';
                }
                const price = `£${workshop.priceFrom || workshop.price || 0}`;
                const duration = workshop.workshop?.duration ? workshop.workshop.duration : 'N/A';
                
                // Color alternates
                const colorSets = [
                  'from-orange-400 to-red-400',
                  'from-blue-400 to-indigo-400',
                  'from-green-400 to-emerald-400',
                  'from-purple-400 to-fuchsia-400',
                  'from-teal-400 to-cyan-400',
                  'from-yellow-400 to-orange-400'
                ];
                const imageColor = colorSets[index % colorSets.length];

                // Registration calculation
                const regCurrent = 0; // Not available in CommonListing easily
                const regMax = workshop.workshop?.maxGroupSize || 0;
                
                // Status mapping
                const isApproved = workshop.isApproved;
                const isSuspended = workshop.visibilityStatus === 'suspended';
                
                let status = 'Pending';
                let statusBg = 'bg-[#fff4e6]';
                let statusText = 'text-[#fd7e14]';

                if (isApproved) {
                  status = 'Approved';
                  statusBg = 'bg-[#e7f5ff]';
                  statusText = 'text-[#339af0]';
                } else if (isSuspended) {
                  status = 'Rejected';
                  statusBg = 'bg-[#ffe3e3]';
                  statusText = 'text-[#fa5252]';
                }

                return (
                  <tr key={workshop.id} className="border-b border-[#e9ecef] hover:bg-slate-50 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-[48px] h-[48px] rounded-md bg-gradient-to-br ${imageColor} shrink-0`}></div>
                        <div>
                          <div className="font-semibold text-slate-800">{title}</div>
                          <div className="text-[13px] text-[#adb5bd]">{subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-[8px] py-[2px] rounded-[4px] text-[12px] font-medium bg-[#e3f9f0] text-[#1fa46b]`}>
                        {categoryText}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">{instructorName}</td>
                    <td className="py-4 px-4 font-medium text-slate-700">{duration}</td>
                    <td className="py-4 px-4">
                      {regMax > 0 ? (
                        <div className="flex flex-col gap-1 w-[80px]">
                          <span className="text-[13px] font-medium text-slate-700">{regCurrent} / {regMax}</span>
                          <div className="w-full bg-[#ececec] h-[6px] rounded-full overflow-hidden">
                            <div 
                              className="bg-[#8b5cf6] h-full rounded-full" 
                              style={{ width: `${Math.min(100, (regCurrent / regMax) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1 w-[80px]">
                          <span className="text-[13px] font-medium text-slate-700">N/A</span>
                          <div className="w-full bg-[#ececec] h-[6px] rounded-full overflow-hidden">
                            <div className="bg-[#ececec] h-full rounded-full w-0"></div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">{price}</td>
                    <td className="py-4 px-4">
                      <span className={`px-[10px] py-[4px] rounded-full text-[12px] font-semibold ${statusBg} ${statusText}`}>
                        {status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded cursor-pointer">
                        <Eye className="w-5 h-5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
