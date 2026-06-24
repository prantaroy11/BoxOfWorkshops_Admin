/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { WorkshopListing, PaginatedResponse } from '@/features/workshops/types';

export default function PendingApprovalView() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [workshops, setWorkshops] = useState<WorkshopListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  const fetchPendingWorkshops = async () => {
    try {
      setLoading(true);
      // The backend returns { success: true, data: { ...paginate object... } }
      // So res.data might be the paginate object or the array directly
      const res = await api.get<{ data: PaginatedResponse<WorkshopListing> | WorkshopListing[] }>('/admin/listings?is_approved=false&visibility_status=draft');
      
      let fetchedWorkshops: WorkshopListing[] = [];
      if (Array.isArray(res.data)) {
        fetchedWorkshops = res.data;
      } else if (res.data && typeof res.data === 'object') {
        fetchedWorkshops = res.data.results || res.data.data || res.data.rows || res.data.docs || [];
      }
      
      setWorkshops(fetchedWorkshops);
      if (fetchedWorkshops.length > 0) {
        setSelectedId(fetchedWorkshops[0].id);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch pending workshops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingWorkshops();
  }, []);

  const handleAction = async (approved: boolean) => {
    if (!selectedId) return;
    try {
      setActionLoading(true);
      await api.patch(`/admin/listings/${selectedId}/approve`, { approved });
      toast.success(`Workshop ${approved ? 'approved' : 'declined'} successfully`);
      
      setWorkshops(prev => {
        const updated = prev.filter(w => w.id !== selectedId);
        if (updated.length > 0) {
          setSelectedId(updated[0].id);
        } else {
          setSelectedId(null);
        }
        return updated;
      });
      setIsDeclineModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || `Failed to ${approved ? 'approve' : 'decline'} workshop`);
    } finally {
      setActionLoading(false);
    }
  };

  const selectedWorkshop = workshops.find(w => w.id === selectedId) || null;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-[22px] font-bold text-slate-800 m-0">Workshop Approval</h1>
        <div className="relative w-full sm:w-[300px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search workshop..."
            className="w-full pl-9 pr-4 py-[8px] bg-white border border-[#ced4da] rounded-md text-[13px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#f1f3f5]">
        <button
          onClick={() => setActiveTab('Pending')}
          className={`pb-[12px] px-[8px] mr-6 text-[14px] font-semibold transition-colors border-b-2 -mb-[1px] ${
            activeTab === 'Pending' ? 'text-[#8b5cf6] border-[#8b5cf6]' : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          Pending <span className={`ml-1 text-[13px] font-medium px-2 py-0.5 rounded-full ${activeTab === 'Pending' ? 'bg-[#f3e8ff] text-[#8b5cf6]' : 'text-slate-400'}`}>{workshops.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('Rejected')}
          className={`pb-[12px] px-[8px] text-[14px] font-semibold transition-colors border-b-2 -mb-[1px] ${
            activeTab === 'Rejected' ? 'text-[#8b5cf6] border-[#8b5cf6]' : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          Rejected <span className={`ml-1 text-[13px] font-medium text-slate-400`}>0</span>
        </button>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex items-center justify-center h-64 w-full">
          <Loader2 className="w-8 h-8 animate-spin text-[#8b5cf6]" />
        </div>
      ) : workshops.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-64 w-full text-slate-500">
          <p className="text-[16px] font-medium">No pending workshops to approve.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column (List) */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3 shrink-0">
            {workshops.map((workshop, index) => {
              const isActive = workshop.id === selectedId;
              const title = workshop.title || 'Untitled Workshop';
              const authorName = workshop.practitioner 
                ? workshop.practitioner.name || workshop.practitioner.contactPerson || 'Unknown Author'
                : 'Unknown Author';
              const appliedDate = workshop.createdAt ? new Date(workshop.createdAt).toLocaleDateString() : 'N/A';
              
              // Alternate gradient colors based on index for some variety
              const colorSets = [
                'from-orange-200 to-amber-200',
                'from-blue-200 to-cyan-200',
                'from-emerald-200 to-teal-200',
                'from-purple-200 to-fuchsia-200'
              ];
              const imageColor = colorSets[index % colorSets.length];

              return (
                <div 
                  key={workshop.id}
                  onClick={() => setSelectedId(workshop.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                    isActive 
                      ? 'bg-[#fbf9ff] border-[#8b5cf6] shadow-[0_2px_10px_rgba(139,92,246,0.1)]' 
                      : 'bg-white border-transparent hover:border-[#e9ecef] shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className={`w-[60px] h-[60px] rounded-xl bg-gradient-to-br ${imageColor} shrink-0`}></div>
                  
                  {/* Info */}
                  <div className="flex flex-col">
                    <h3 className={`font-semibold text-[15px] mb-0.5 ${isActive ? 'text-[#8b5cf6]' : 'text-slate-800'}`}>
                      {title}
                    </h3>
                    <p className="text-[13px] text-slate-500 mb-1">By {authorName}</p>
                    <p className="text-[12px] text-slate-400">Applied on {appliedDate}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (Detail View) */}
          {selectedWorkshop && (
            <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden w-full">
              {/* Banner */}
              <div className={`w-full h-[220px] bg-gradient-to-br from-indigo-200 to-purple-200`}></div>
              
              {/* Content */}
              <div className="p-8">
                <h2 className="text-[24px] font-bold text-slate-800 mb-1">{selectedWorkshop.title || 'Untitled'}</h2>
                <p className="text-[15px] text-slate-500 mb-8">
                  By {selectedWorkshop.practitioner ? selectedWorkshop.practitioner.name || selectedWorkshop.practitioner.contactPerson || 'Unknown Author' : 'Unknown Author'}
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
                  <div>
                    <p className="text-[13px] text-slate-400 mb-1 font-medium">Category</p>
                    <p className="text-[15px] font-semibold text-slate-800">
                      {selectedWorkshop.workshop?.categoryTags && selectedWorkshop.workshop.categoryTags.length > 0
                        ? selectedWorkshop.workshop.categoryTags.join(', ')
                        : selectedWorkshop.subcategories && selectedWorkshop.subcategories.length > 0
                        ? selectedWorkshop.subcategories.map((s: any) => s.name).join(', ')
                        : selectedWorkshop.category?.name || selectedWorkshop.serviceType?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] text-slate-400 mb-1 font-medium">Date & Time</p>
                    <p className="text-[15px] font-semibold text-slate-800">
                      {selectedWorkshop.workshop?.availability?.dateTime ? new Date(selectedWorkshop.workshop.availability.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] text-slate-400 mb-1 font-medium">Price</p>
                    <p className="text-[15px] font-semibold text-slate-800">£{selectedWorkshop.priceFrom || selectedWorkshop.price || 0}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-slate-400 mb-1 font-medium">Duration</p>
                    <p className="text-[15px] font-semibold text-slate-800">{selectedWorkshop.workshop?.duration || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-slate-400 mb-1 font-medium">Seats</p>
                    <p className="text-[15px] font-semibold text-slate-800">{selectedWorkshop.workshop?.maxGroupSize || 'N/A'}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <p className="text-[13px] text-slate-400 mb-2 font-medium">Description</p>
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {selectedWorkshop.shortDescription || selectedWorkshop.description || 'No description provided.'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => setIsDeclineModalOpen(true)}
                    disabled={actionLoading}
                    className="px-6 py-2.5 rounded-lg bg-[#ff4c4c] text-white font-medium text-[14px] hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    Decline
                  </button>
                  <button 
                    onClick={() => handleAction(true)}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#00c875] text-white font-medium text-[14px] hover:bg-[#00a862] transition-colors disabled:opacity-50"
                  >
                    {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Decline Modal Overlay */}
      {isDeclineModalOpen && selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] p-8 w-full max-w-[360px] text-center shadow-xl">
            <div className="w-14 h-14 bg-[#fff1f2] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-[#ff4c4c]" />
            </div>
            <h2 className="text-[20px] font-bold text-[#1f2937] mb-3">Decline Workshop?</h2>
            <p className="text-[14px] text-[#6b7280] mb-8 leading-relaxed">
              Are you sure you want to decline <strong className="font-semibold text-[#374151]">&quot;{selectedWorkshop.title}&quot;</strong>? The instructor will be notified.
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setIsDeclineModalOpen(false)}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-lg border border-[#e5e7eb] text-[#374151] font-medium text-[14px] hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleAction(false)}
                disabled={actionLoading}
                className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg bg-[#ff4c4c] text-white font-medium text-[14px] hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Yes, Decline
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
