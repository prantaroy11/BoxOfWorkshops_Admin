import React from 'react';
import WorkshopsView from '@/features/workshops/components/WorkshopsView';

export default function AllWorkshopsPage() {
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-[22px] font-bold text-slate-800 m-0">All Workshops</h1>
      <WorkshopsView />
    </div>
  );
}
