'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import { Check } from 'lucide-react';

interface ApprovePractitionerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  practitioner: any;
  onApprove: () => void;
}

export default function ApprovePractitionerModal({
  isOpen,
  onClose,
  practitioner,
  onApprove,
}: ApprovePractitionerModalProps) {
  if (!practitioner) return null;

  const handleApprove = () => {
    onApprove();
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
        <div className="flex items-center gap-2 text-[#15803d]">
          <Check className="w-5 h-5" />
          <h2 className="text-[18px] font-semibold m-0">Approve account</h2>
        </div>

        <p className="text-[14px] text-slate-600 m-0 leading-relaxed">
          {practitioner.name} will be notified and can start hosting workshops.
        </p>

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
            onClick={handleApprove}
            className="flex-1 py-2.5 rounded-[8px] border border-slate-300 text-slate-800 font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <Check className="w-4 h-4" /> Confirm approve
          </button>
        </div>
      </div>
    </Modal>
  );
}
