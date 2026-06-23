"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNewsletterStore } from '../hooks/useNewsletterStore';
import { api } from '@/lib/api';
import { ChevronLeft, Check, X, Send } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterReview() {
  const router = useRouter();
  const { selectedCampaign } = useNewsletterStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal states
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  // If page is refreshed and store is empty, go back
  if (!selectedCampaign) {
    if (typeof window !== 'undefined') {
      router.push('/newsletter');
    }
    return null;
  }

  const {
    subject,
    previewText,
    fromName,
    fromEmail,
    coverImage,
    mainHeader,
    acceleratedLearning,
    tipsText = [],
    featuredWorkshops = [],
    categories = [],
    audienceSize,
    status,
    createdAt
  } = selectedCampaign;

  const campaignIdToUpdate = selectedCampaign.id || selectedCampaign.campaignId || selectedCampaign._id;

  const handleReviewAction = async (action: 'approve' | 'request_corrections', reason?: string) => {
    try {
      setIsSubmitting(true);
      await api.patch(`/admin/newsletters/${campaignIdToUpdate}/review`, { action, reviewNotes: reason });
      toast.success(`Newsletter ${action === 'approve' ? 'approved' : 'rejected'} successfully.`);
      router.push('/newsletter');
    } catch (err: any) {
      toast.error(err.message || 'Error updating newsletter status');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (s: string) => {
    if (s === 'approved') return 'bg-green-50 text-green-700 border-green-200';
    if (s === 'pending_review' || s === 'pending') return 'bg-orange-50 text-orange-700 border-orange-200';
    if (s === 'corrections_requested' || s === 'rejected') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };
  
  const getStatusDotColor = (s: string) => {
    if (s === 'approved') return 'bg-green-500';
    if (s === 'pending_review' || s === 'pending') return 'bg-orange-500';
    if (s === 'corrections_requested' || s === 'rejected') return 'bg-red-500';
    return 'bg-gray-500';
  };

  const formattedStatus = status === 'pending_review' ? 'Pending' : 
                          status === 'corrections_requested' ? 'Rejected' : 
                          status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';

  return (
    <div className="w-full flex flex-col gap-6 pt-4 font-sans h-full">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.push('/newsletter')}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-100 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2937]">Newsletter Approval</h1>
          <p className="text-[#6B7280] text-sm mt-1">Review and Approve newsletters submitted by practitioners</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Left Column (Preview) ── */}
        <div className="flex-1 w-full max-w-[800px]">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Mock Preview Box */}
            <div className="bg-[#F3F4F6] rounded-xl p-4 h-[calc(100vh-280px)] min-h-[600px] overflow-y-auto border border-gray-200">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                
                {/* Inbox Header Mock */}
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <div className="text-[13px] font-bold text-gray-900 mb-1">{subject || "No Subject"}</div>
                  <div className="text-[11px] text-gray-500 flex justify-between">
                    <span>From: {fromName} &lt;{fromEmail}&gt;</span>
                    <span>10:00 AM</span>
                  </div>
                </div>

                {/* Header */}
                <div className="p-4 flex justify-between items-center border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                    <div className="font-extrabold text-[12px] leading-tight text-gray-900">Box of<br/>Workshops</div>
                  </div>
                  <div className="text-[9px] text-gray-400 text-right">
                    View in Browser
                  </div>
                </div>

                {/* Main Headline */}
                <div className="p-6 text-center">
                  <h2 className="text-lg font-extrabold text-gray-900 mb-2">{subject}</h2>
                  <p className="text-xs text-gray-600 m-0">{previewText}</p>
                </div>

                {/* Image */}
                {coverImage ? (
                  <div className="h-[200px] bg-gray-200 relative">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-[200px] bg-gray-100 flex items-center justify-center text-gray-400 text-xs border-y border-gray-200">
                    No Cover Image
                  </div>
                )}

                {/* Hi First Name */}
                <div className="p-6 flex gap-3">
                  <div className="text-xl">👋</div>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 mb-2">Hi {"{{"}First Name{"}}"},</h3>
                    <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap m-0">
                      {mainHeader}
                    </p>
                  </div>
                </div>

                {/* How Workshops Accelerate Learning */}
                {acceleratedLearning && (
                  <div className="px-6 pb-6">
                    <h3 className="text-sm font-extrabold text-gray-900 mb-3">How Workshops Accelerate Learning</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 whitespace-pre-wrap">
                      {acceleratedLearning}
                    </p>
                    <ul className="m-0 p-0 list-none text-[11px] text-gray-600 leading-[1.8]">
                      <li className="flex gap-2"><span className="text-yellow-500">•</span> Hands-on, practical skill building</li>
                      <li className="flex gap-2"><span className="text-yellow-500">•</span> Direct access to industry experts</li>
                      <li className="flex gap-2"><span className="text-yellow-500">•</span> Collaborative peer-to-peer learning</li>
                      <li className="flex gap-2"><span className="text-yellow-500">•</span> Focused, outcome-oriented goals</li>
                    </ul>
                  </div>
                )}

                {/* Featured Workshops */}
                {featuredWorkshops && featuredWorkshops.length > 0 && (
                  <div className="px-6 pb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-extrabold text-gray-900 m-0">Featured Workshops</h3>
                      <span className="text-[11px] text-yellow-500 font-semibold cursor-pointer">View all workshops →</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {featuredWorkshops.map((w: any) => (
                        <div key={w.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                          <div className="h-20 bg-gray-300">
                            {w.image && <img src={w.image} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <div className="p-3">
                            <div className="text-[10px] text-yellow-500 font-bold mb-1">{w.category || w.Subcategory?.name || 'Category'}</div>
                            <div className="text-xs font-extrabold text-gray-900 mb-1">{w.title}</div>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-yellow-400 text-[10px]">★★★★★</span>
                              <span className="text-[10px] text-gray-500">{w.rating || '4.9'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-gray-400">{w.enrolled || '0'} Enrolled</span>
                              <span className="text-[10px] text-yellow-500 font-bold cursor-pointer">View Workshop</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dark Stats Section */}
                <div className="bg-[#1A1A2E] p-6 flex justify-between text-white text-center">
                  <div>
                    <div className="w-7 h-7 mx-auto mb-2 bg-white/10 rounded flex items-center justify-center text-sm">👤</div>
                    <div className="text-base font-extrabold">1,200+</div>
                    <div className="text-[10px] text-gray-400 mt-1">Participants</div>
                  </div>
                  <div>
                    <div className="w-7 h-7 mx-auto mb-2 bg-white/10 rounded flex items-center justify-center text-sm">🏛️</div>
                    <div className="text-base font-extrabold">150+</div>
                    <div className="text-[10px] text-gray-400 mt-1">Workshops</div>
                  </div>
                  <div>
                    <div className="w-7 h-7 mx-auto mb-2 bg-white/10 rounded flex items-center justify-center text-sm">📚</div>
                    <div className="text-base font-extrabold">75+</div>
                    <div className="text-[10px] text-gray-400 mt-1">Expert Instructors</div>
                  </div>
                </div>

                {/* Light Yellow Tips Section */}
                {(() => {
                  const tipsList = Array.isArray(tipsText) 
                    ? tipsText 
                    : (typeof tipsText === 'string' ? tipsText.split('\n').filter((t: string) => t.trim() !== "") : []);
                    
                  if (tipsList.length === 0) return null;
                  
                  return (
                    <div className="bg-yellow-50 p-7">
                      <h3 className="text-sm font-extrabold text-gray-900 mb-4">5 Tips to Get Most From Your Workshops</h3>
                      <ul className="m-0 p-0 list-none text-xs text-gray-600 leading-[1.8]">
                        {tipsList.map((tip: string, idx: number) => (
                          <li key={idx} className="flex gap-2 mb-2">
                            <span className="text-yellow-500 font-bold">{idx + 1}.</span> {tip.replace(/^\d+\.\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}

                {/* Purple Section */}
                <div className="bg-purple-500 p-10 text-center text-white">
                  <div className="text-2xl mb-4">✨</div>
                  <h2 className="text-xl font-extrabold mb-3">Ready To Learn Something Now?</h2>
                  <p className="text-xs text-purple-100 mb-6 leading-relaxed px-5">
                    Browse our massive catalog of workshops and master a new creative or technical skill.
                  </p>
                  <button className="bg-yellow-400 text-gray-900 border-none px-8 py-3 rounded-full text-xs font-extrabold cursor-pointer">Explore Workshops →</button>
                </div>

                {/* Footer */}
                <div className="bg-[#1A1A2E] p-6 text-center text-white">
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                    <div className="font-extrabold text-xs">Box of Workshops</div>
                  </div>
                  <div className="flex justify-center gap-4 text-[10px] text-white/50 mb-4">
                    <span className="cursor-pointer">Manage Preferences</span>
                    <span className="cursor-pointer">Unsubscribe</span>
                    <span className="cursor-pointer">View in Browser</span>
                    <span className="cursor-pointer">Privacy Policy</span>
                  </div>
                  <div className="text-[10px] text-white/30 leading-relaxed">
                    © 2024 Box of Workshops. All Rights Reserved.<br/>
                    Powered by <b>BOX OF WORKSHOPS</b>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column (Details) ── */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
            <h3 className="text-base font-bold text-gray-900 mb-6">Newsletter Details</h3>
            
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-500 mb-2">Newsletter Name</label>
              <input 
                type="text" 
                value={subject || ''} 
                disabled 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-500 mb-2">Status</label>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(status)}`} />
                {formattedStatus}
              </span>
            </div>

            <div className="mb-8 flex justify-between items-center pb-6 border-b border-gray-100">
              <span className="text-xs font-medium text-gray-500">Total Subscribers</span>
              <span className="text-sm font-bold text-gray-900">{audienceSize?.toLocaleString() || 0}</span>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setIsDeclineModalOpen(true)}
                disabled={isSubmitting || status === 'approved' || status === 'scheduled' || status === 'sent'}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" /> Reject
              </button>
              
              <button 
                onClick={() => handleReviewAction('approve')}
                disabled={isSubmitting || status === 'approved' || status === 'scheduled' || status === 'sent'}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decline Modal */}
      {isDeclineModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[400px] p-6">
            <div className="flex items-center gap-2 mb-1">
              <X className="w-5 h-5 text-[#991b1b]" />
              <h2 className="text-[#991b1b] text-lg font-semibold">Decline newsletter</h2>
            </div>
            <p className="text-gray-600 text-sm mb-5 pl-7">
              This reason will be emailed to the practitioner.
            </p>
            
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Enter reason for declining..."
              className="w-full h-28 p-3.5 mb-6 bg-[#fef2f2] border border-[#fca5a5] rounded-lg text-red-900 placeholder-red-400 outline-none focus:ring-2 focus:ring-red-200 resize-none text-sm"
            />
            
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsDeclineModalOpen(false);
                  setDeclineReason('');
                }}
                className="flex-1 py-2.5 px-4 rounded-lg border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleReviewAction('request_corrections', declineReason);
                  setIsDeclineModalOpen(false);
                }}
                disabled={isSubmitting || !declineReason.trim()}
                className="flex-1 py-2.5 px-4 rounded-lg border border-gray-200 flex items-center justify-center gap-2 text-gray-900 font-semibold hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Send & decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
