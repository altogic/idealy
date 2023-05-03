import React from 'react';

export default function MiniUserCardSkeleton({ count = 1 }) {
  return (
    <div className="animate-pulse">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-4 px-6 py-4 border-b border-slate-200 transition 700 w-full">
          <div className="h-10 w-10 bg-slate-300 rounded-full" />
          <div className="bg-slate-300 w-2/3  h-4 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
