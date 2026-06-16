'use client';

import React, { useState } from 'react';
import { Search, AlertCircle, MessageSquare, X } from 'lucide-react';

const WORKSHOPS = [
  {
    id: 1,
    title: 'Watercolor Painting Basics',
    author: 'June Cooper',
    appliedDate: '14 May 2024',
    category: 'Art & Design',
    dateTime: '25 May 2024, 10:00 AM',
    price: '$49.00',
    duration: '2 Hours',
    seats: 20,
    description: 'Learn the fundamentals of watercolor painting in this beginner-friendly workshop. All materials included.',
    imageColor: 'from-orange-200 to-amber-200'
  },
  {
    id: 2,
    title: 'Advanced Digital Marketing',
    author: 'Jacob Jones',
    appliedDate: '14 May 2024',
    category: 'Marketing',
    dateTime: '28 May 2024, 2:00 PM',
    price: '$89.00',
    duration: '3 Hours',
    seats: 50,
    description: 'Master advanced digital marketing strategies including SEO, PPC, and social media advertising in this comprehensive deep dive.',
    imageColor: 'from-blue-200 to-cyan-200'
  },
  {
    id: 3,
    title: 'Public Speaking Masterclass',
    author: 'Cameron Williamson',
    appliedDate: '15 May 2024',
    category: 'Personal Development',
    dateTime: '02 Jun 2024, 9:00 AM',
    price: '$120.00',
    duration: '4 Hours',
    seats: 15,
    description: 'Overcome stage fright and deliver compelling presentations with confidence in this interactive masterclass.',
    imageColor: 'from-emerald-200 to-teal-200'
  },
  {
    id: 4,
    title: 'Financial Planning 101',
    author: 'Dennis Robertson',
    appliedDate: '18 May 2024',
    category: 'Finance',
    dateTime: '10 Jun 2024, 6:00 PM',
    price: '$35.00',
    duration: '1.5 Hours',
    seats: 100,
    description: 'A practical guide to personal finance covering budgeting, saving, and basic investment strategies for young professionals.',
    imageColor: 'from-purple-200 to-fuchsia-200'
  }
];

export default function PendingApprovalView() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedId, setSelectedId] = useState(1);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestNotes, setRequestNotes] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const suggestions = [
    "Update workshop description",
    "Correct pricing information",
    "Add more detail to schedule",
    "Fix instructor bio",
    "Update category"
  ];
  
  const toggleSuggestion = (s: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  const selectedWorkshop = WORKSHOPS.find(w => w.id === selectedId) || WORKSHOPS[0];

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
          Pending <span className={`ml-1 text-[13px] font-medium px-2 py-0.5 rounded-full ${activeTab === 'Pending' ? 'bg-[#f3e8ff] text-[#8b5cf6]' : 'text-slate-400'}`}>34</span>
        </button>
        <button
          onClick={() => setActiveTab('Rejected')}
          className={`pb-[12px] px-[8px] text-[14px] font-semibold transition-colors border-b-2 -mb-[1px] ${
            activeTab === 'Rejected' ? 'text-[#8b5cf6] border-[#8b5cf6]' : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          Rejected <span className={`ml-1 text-[13px] font-medium text-slate-400`}>40</span>
        </button>
      </div>

      {/* Master Detail Split */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column (List) */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3 shrink-0">
          {WORKSHOPS.map((workshop) => {
            const isActive = workshop.id === selectedId;
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
                <div className={`w-[60px] h-[60px] rounded-xl bg-gradient-to-br ${workshop.imageColor} shrink-0`}></div>
                
                {/* Info */}
                <div className="flex flex-col">
                  <h3 className={`font-semibold text-[15px] mb-0.5 ${isActive ? 'text-[#8b5cf6]' : 'text-slate-800'}`}>
                    {workshop.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 mb-1">By {workshop.author}</p>
                  <p className="text-[12px] text-slate-400">Applied on {workshop.appliedDate}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (Detail View) */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden w-full">
          {/* Banner */}
          <div className={`w-full h-[220px] bg-gradient-to-br ${selectedWorkshop.imageColor}`}></div>
          
          {/* Content */}
          <div className="p-8">
            <h2 className="text-[24px] font-bold text-slate-800 mb-1">{selectedWorkshop.title}</h2>
            <p className="text-[15px] text-slate-500 mb-8">By {selectedWorkshop.author}</p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
              <div>
                <p className="text-[13px] text-slate-400 mb-1 font-medium">Category</p>
                <p className="text-[15px] font-semibold text-slate-800">{selectedWorkshop.category}</p>
              </div>
              <div>
                <p className="text-[13px] text-slate-400 mb-1 font-medium">Date & Time</p>
                <p className="text-[15px] font-semibold text-slate-800">{selectedWorkshop.dateTime}</p>
              </div>
              <div>
                <p className="text-[13px] text-slate-400 mb-1 font-medium">Price</p>
                <p className="text-[15px] font-semibold text-slate-800">{selectedWorkshop.price}</p>
              </div>
              <div>
                <p className="text-[13px] text-slate-400 mb-1 font-medium">Duration</p>
                <p className="text-[15px] font-semibold text-slate-800">{selectedWorkshop.duration}</p>
              </div>
              <div>
                <p className="text-[13px] text-slate-400 mb-1 font-medium">Seats</p>
                <p className="text-[15px] font-semibold text-slate-800">{selectedWorkshop.seats}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <p className="text-[13px] text-slate-400 mb-2 font-medium">Description</p>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {selectedWorkshop.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setIsRequestModalOpen(true)}
                className="px-6 py-2.5 rounded-lg border border-[#ced4da] text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition-colors"
              >
                Request Changes
              </button>
              <button 
                onClick={() => setIsDeclineModalOpen(true)}
                className="px-6 py-2.5 rounded-lg bg-[#ff4c4c] text-white font-medium text-[14px] hover:bg-red-600 transition-colors"
              >
                Decline
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-[#00c875] text-white font-medium text-[14px] hover:bg-[#00a862] transition-colors">
                Approve
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Decline Modal Overlay */}
      {isDeclineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] p-8 w-full max-w-[360px] text-center shadow-xl">
            <div className="w-14 h-14 bg-[#fff1f2] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-[#ff4c4c]" />
            </div>
            <h2 className="text-[20px] font-bold text-[#1f2937] mb-3">Decline Workshop?</h2>
            <p className="text-[14px] text-[#6b7280] mb-8 leading-relaxed">
              Are you sure you want to decline <strong className="font-semibold text-[#374151]">"{selectedWorkshop.title}"</strong>? The instructor will be notified.
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setIsDeclineModalOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#e5e7eb] text-[#374151] font-medium text-[14px] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsDeclineModalOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-[#ff4c4c] text-white font-medium text-[14px] hover:bg-red-600 transition-colors"
              >
                Yes, Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Changes Modal Overlay */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-[#f1f3f5]">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#fff8eb] flex items-center justify-center text-[#f5b041] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-[#1f2937] mb-0.5">Request Changes</h2>
                  <p className="text-[13px] text-slate-400">{selectedWorkshop.title}</p>
                </div>
              </div>
              <button onClick={() => setIsRequestModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3 className="text-[14px] font-semibold text-[#374151] mb-3">Quick suggestions</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {suggestions.map(s => (
                  <button 
                    key={s} 
                    onClick={() => toggleSuggestion(s)}
                    className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                      selectedSuggestions.includes(s) 
                        ? 'bg-[#fbf9ff] text-[#8b5cf6] border border-[#8b5cf6]' 
                        : 'bg-white text-slate-600 border border-[#e2e8f0] hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 mb-2">
                <h3 className="text-[14px] font-semibold text-[#374151]">Additional notes</h3>
                <span className="text-[13px] text-slate-400">(required if no suggestion selected)</span>
              </div>
              <div className="relative">
                <textarea
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  placeholder="Describe what needs to be changed or improved..."
                  className="w-full h-[120px] p-3 pb-8 text-[14px] text-slate-700 border border-[#e2e8f0] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#f5b041] focus:border-transparent"
                ></textarea>
                <div className="absolute bottom-3 right-3 text-[12px] text-slate-400">
                  {requestNotes.length}/300
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 pt-2 bg-white">
              <button 
                onClick={() => setIsRequestModalOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-[#e2e8f0] text-[#374151] font-medium text-[14px] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setRequestNotes('');
                  setSelectedSuggestions([]);
                }}
                disabled={selectedSuggestions.length === 0 && requestNotes.trim().length === 0}
                className="px-5 py-2.5 rounded-lg bg-[#facb88] text-white font-medium text-[14px] hover:bg-[#f5b041] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
