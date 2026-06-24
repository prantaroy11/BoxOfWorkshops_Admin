/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { X, Send } from 'lucide-react';

interface DeclinePractitionerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  practitioner: any;
  onDecline: (reason: string, notify: boolean) => void;
}

export default function DeclinePractitionerModal({
  isOpen,
  onClose,
  practitioner,
  onDecline,
}: DeclinePractitionerModalProps) {
  const [reason, setReason] = useState('');
  const [notify, setNotify] = useState(true);

  if (!practitioner) return null;

  const handleDecline = () => {
    onDecline(reason, notify);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={null}
      hideCloseButton={true}
      maxWidth="max-w-[420px]"
    >
      <div className="p-6 flex flex-col gap-4 bg-white">
        {/* Custom Header */}
        <div className="flex items-center gap-2 text-[#991b1b]">
          <button onClick={onClose} className="hover:bg-red-50 p-1 rounded-md transition-colors -ml-1">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-[18px] font-semibold m-0">Decline account</h2>
        </div>

        <p className="text-[14px] text-slate-600 m-0">
          This reason will be emailed to the practitioner.
        </p>

        {/* Text Area */}
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for declining..."
          className="w-full min-h-[140px] rounded-[8px] p-4 text-[14px] border border-[#fca5a5] bg-[#fef2f2] focus:outline-none focus:ring-2 focus:ring-[#fca5a5] placeholder-[#991b1b]/60 text-[#991b1b] resize-none"
        />

        <div className="h-[1px] bg-slate-200 w-full mt-2 mb-2"></div>

        {/* Footer Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-[8px] border border-slate-300 text-slate-800 font-semibold text-[14px] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDecline}
            disabled={!reason.trim()}
            className="flex-1 py-2.5 rounded-[8px] border border-slate-300 text-slate-800 font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <Send className="w-4 h-4" /> Send & decline
          </button>
        </div>
      </div>
    </Modal>
  );
}
