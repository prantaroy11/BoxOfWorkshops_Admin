/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect, react-hooks/purity, @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Hourglass, 
  CheckCircle, 
  XCircle, 
  Users, 
  Search, 
  ChevronDown 
} from 'lucide-react';
import { api } from '@/lib/api';
import { useNewsletterStore } from '../hooks/useNewsletterStore';

export function NewsletterApproval() {
  const router = useRouter();
  const { setSelectedCampaign } = useNewsletterStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, subscribers: 0 });

  const fetchCampaigns = async () => {
    try {
      const res = await api.get<any>('/admin/newsletters');
      if (res.success) {
        setCampaigns(res.data);
        const p = res.data.filter((c: any) => c.status === 'pending_review' || c.status === 'pending').length;
        const a = res.data.filter((c: any) => c.status === 'approved' || c.status === 'scheduled' || c.status === 'sent').length;
        const r = res.data.filter((c: any) => c.status === 'corrections_requested' || c.status === 'rejected' || c.status === 'cancelled').length;
        const s = res.data.reduce((sum: number, c: any) => sum + (c.audienceSize || 0), 0);
        setStats({ pending: p, approved: a, rejected: r, subscribers: s || 850 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const getStatusLabel = (status: string) => {
    if (status === 'pending_review' || status === 'pending') return 'Pending';
    if (status === 'corrections_requested' || status === 'rejected' || status === 'cancelled') return 'Rejected';
    if (status === 'approved' || status === 'scheduled' || status === 'sent') return 'Approved';
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
  };

  const filteredData = campaigns.filter(item => {
    const title = item.subject || 'No Subject';
    const creatorName = item.Practitioner?.user?.firstName || item.fromName || 'Unknown';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusLabel = getStatusLabel(item.status);
    const matchesStatus = statusFilter === 'All' || statusLabel === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col gap-6 pt-4">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937]">Newsletter Approval</h1>
        <p className="text-[#6B7280] text-sm mt-1">Review and Approve newsletters submitted by practitioners</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Pending Review */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[#6B7280] font-medium text-sm">Pending Review</span>
            <div className="p-2 bg-orange-50 rounded-full">
              <Hourglass className="w-4 h-4 text-orange-500" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-orange-500">{stats.pending}</span>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[#6B7280] font-medium text-sm">Approved</span>
            <div className="p-2 bg-green-50 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-green-500">{stats.approved}</span>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[#6B7280] font-medium text-sm">Rejected</span>
            <div className="p-2 bg-red-50 rounded-full">
              <XCircle className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-red-500">{stats.rejected}</span>
          </div>
        </div>

        {/* Subscribers */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[#6B7280] font-medium text-sm">Subscribers</span>
            <div className="p-2 bg-purple-50 rounded-full">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-purple-600">{stats.subscribers.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search newsletters..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#4B5563] hover:bg-gray-50 transition-colors"
            >
              {statusFilter === 'All' ? 'All Status' : statusFilter} <ChevronDown className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-1">
                <div className="px-4 py-2.5 text-sm font-semibold text-[#1F2937]">All Status</div>
                {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${statusFilter === status ? 'text-purple-600 font-medium' : 'text-[#4B5563]'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider">
                <th className="pb-4 font-medium">NEWSLETTER</th>
                <th className="pb-4 font-medium text-center">Creator</th>
                <th className="pb-4 font-medium text-center">Submitted date</th>
                <th className="pb-4 font-medium text-center">Categories</th>
                <th className="pb-4 font-medium text-center">Status</th>
                <th className="pb-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item, index) => {
                const labelStatus = getStatusLabel(item.status);
                const title = item.subject || 'No Subject';
                const subtitle = item.Practitioner?.businessName || item.fromName || 'Unknown';
                const creatorName = item.Practitioner?.user?.firstName || item.fromName || 'Unknown';
                const avatar = item.Practitioner?.user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(creatorName)}&background=random`;
                const dateObj = new Date(item.createdAt || Date.now());
                const date = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const category = item.categories?.[0] || 'Newsletter';
                const image = item.coverImage || 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=100&h=100';

                return (
                  <tr key={item.id || index} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0 bg-gray-100">
                          <img src={image} alt={title} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <img src={avatar} alt={creatorName} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs text-gray-600">{creatorName}</span>
                      </div>
                    </td>
                    
                    <td className="py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-900">{date}</span>
                        <span className="text-xs text-gray-500">{time}</span>
                      </div>
                    </td>
                    
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {category}
                      </span>
                    </td>
                    
                    <td className="py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        labelStatus === 'Approved' ? 'bg-green-50 text-green-700' : 
                        labelStatus === 'Pending' ? 'bg-orange-50 text-orange-700' : 
                        'bg-red-50 text-red-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          labelStatus === 'Approved' ? 'bg-green-500' : 
                          labelStatus === 'Pending' ? 'bg-orange-500' : 
                          'bg-red-500'
                        }`} />
                        {labelStatus}
                      </span>
                    </td>
                    
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => {
                          setSelectedCampaign(item);
                          const id = item.id || item.campaignId || item._id;
                          router.push(`/newsletter/${id}`);
                        }}
                        className="text-sm text-gray-600 hover:text-purple-600 font-medium transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No newsletters found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
