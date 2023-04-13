import React from 'react';

export default function RoadmapCardSkeleton() {
  return (
    <div
      role="status"
      className="w-full space-y-4 divide-y divide-gray-300 dark:divide-aa-600 purple:divide-pt-800 animate-pulse border border-slate-200 rounded-lg">
      <div className="flex justify-between items-center px-4 py-8">
        <div className="flex items-center gap-6 w-full">
          <div className="shrink-0 w-[62px] h-20 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-lg" />
          <div className="w-full">
            <div className="w-full h-2.5 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full mb-2.5" />
            <div className="w-32 h-2 bg-gray-300 dark:bg-aa-600 purple:bg-pt-800 rounded-full mb-2.5" />
          </div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
