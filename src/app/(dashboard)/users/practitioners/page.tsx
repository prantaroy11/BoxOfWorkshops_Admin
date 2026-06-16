import React from 'react';
import PractitionersView from '@/features/practitioners/components/PractitionersView';

export default function PractitionersPage() {
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-[22px] font-bold text-slate-800 m-0">Practitioners</h1>
      <PractitionersView />
    </div>
  );
}