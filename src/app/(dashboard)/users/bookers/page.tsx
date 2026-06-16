import React from 'react';
import BookersView from '@/features/bookers/components/BookersView';

export default function BookersPage() {
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-[22px] font-bold text-slate-800 m-0">Booker</h1>
      <BookersView />
    </div>
  );
}