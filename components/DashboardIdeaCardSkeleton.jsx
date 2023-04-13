import React from 'react';

export default function DashboardIdeaCardSkeleton() {
  return (
    <div role="status" className="w-full space-y-4 divide-y divide-gray-300 animate-pulse">
      <div className="flex justify-between items-center px-4 py-8">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="w-64 h-2.5 bg-gray-300 rounded-full" />
          <div className="w-full h-2.5 bg-gray-300 rounded-full" />
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="w-64 h-2.5 bg-gray-300 rounded-full" />
            <div className="w-32 h-2.5 bg-gray-300 rounded-full" />
          </div>
          <div className="flex justify-end w-full">
            <div className="w-64 h-2.5 bg-gray-300 rounded-full" />
          </div>
          {/* <div className="h-2.5 bg-gray-300 rounded-full w-24" /> */}
        </div>
        {/* <div className="h-2.5 bg-gray-300 rounded-full w-12" /> */}
      </div>
      <div className="flex justify-between items-center px-4 py-8">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="w-64 h-2.5 bg-gray-300 rounded-full" />
          <div className="w-full h-2.5 bg-gray-300 rounded-full" />
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="w-64 h-2.5 bg-gray-300 rounded-full" />
            <div className="w-32 h-2.5 bg-gray-300 rounded-full" />
          </div>
          <div className="flex justify-end w-full">
            <div className="w-64 h-2.5 bg-gray-300 rounded-full" />
          </div>
          {/* <div className="h-2.5 bg-gray-300 rounded-full w-24" /> */}
        </div>
        {/* <div className="h-2.5 bg-gray-300 rounded-full w-12" /> */}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
