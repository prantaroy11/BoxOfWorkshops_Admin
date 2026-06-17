'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import { RotateCcw, CheckCircle2, MapPin, Mail } from 'lucide-react';

interface PractitionerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  practitioner: any;
}

export default function PractitionerProfileModal({ isOpen, onClose, practitioner }: PractitionerProfileModalProps) {
  if (!practitioner) return null;

  const titleContent = (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-[18px] font-bold text-slate-800 m-0 leading-none">Practitioner Profile</h2>
      <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[12px] font-medium leading-none">
        Under Review
      </span>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleContent} maxWidth="max-w-[480px]">
      <div className="p-[24px] flex flex-col gap-[24px]">
        
        {/* Header Info */}
        <div className="flex gap-4 items-start">
          <div className={`w-[60px] h-[60px] rounded-[12px] flex items-center justify-center text-xl font-bold shrink-0 ${practitioner.bg || 'bg-emerald-100'} ${practitioner.text || 'text-emerald-600'}`}>
            {practitioner.avatar}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-bold text-slate-800 m-0">{practitioner.name}</h3>
            <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
              <Mail className="w-3.5 h-3.5" />
              <span>{practitioner.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-[11px] font-medium">Meditation</span>
              <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-[11px] font-medium">Mindfulness</span>
              <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-[11px] font-medium">Stress Relief</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider m-0">About</h4>
          <p className="text-[14px] text-slate-700 m-0 leading-relaxed">
            Certified meditation coach specializing in mindfulness and stress reduction techniques for modern lifestyles.
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider m-0">Skills / Expertise</h4>
          <div className="flex flex-wrap gap-2">
            <span className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-[12px]">Certified Instructor</span>
            <span className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-[12px]">Mindfulness</span>
          </div>
        </div>

        {/* Workshop Categories */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider m-0">Workshop Categories</h4>
          <div className="flex flex-wrap gap-2">
            <span className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-[12px]">Art & Craft</span>
            <span className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-[12px]">Cooking</span>
            <span className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-[12px]">Yoga & Meditation</span>
            <span className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-[12px]">Music</span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider m-0">Additional Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[12px] text-slate-500 mb-1">Member Type</div>
              <div className="text-[14px] font-medium text-slate-800">{practitioner.accountType || 'Individual'}</div>
            </div>
            <div>
              <div className="text-[12px] text-slate-500 mb-1">Experience</div>
              <div className="text-[14px] font-medium text-slate-800">{practitioner.experience || '5 Years'}</div>
            </div>
          </div>
        </div>

        {/* Admin Notes */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider m-0">Admin Notes</h4>
          <textarea 
            className="w-full border border-slate-200 rounded-[8px] p-3 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4c6ef5] focus:border-transparent min-h-[100px] resize-y"
            placeholder="Add internal notes about this practitioner..."
          ></textarea>
        </div>

      </div>

      {/* Footer Buttons */}
      <div className="p-[24px] border-t border-[#f1f3f5] flex gap-4">
        <button className="flex-1 py-2.5 px-4 rounded-[8px] border border-red-500 text-red-500 font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
          <RotateCcw className="w-4 h-4" /> Decline Approval
        </button>
        <button className="flex-1 py-2.5 px-4 rounded-[8px] bg-[#10b981] hover:bg-[#059669] text-white font-medium text-[14px] flex items-center justify-center gap-2 transition-colors shadow-sm">
          <CheckCircle2 className="w-4 h-4" /> Approve
        </button>
      </div>

    </Modal>
  );
}
